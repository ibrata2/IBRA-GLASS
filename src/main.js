'use strict';
/*
 * IBRA GLASS — main process
 * تصميم وتطوير إبراهيم الخزرجي — t.me/ibraprogram
 *
 * The glass effect itself is produced by the unmodified ExplorerBlurMica engine
 * (https://github.com/Maplespe/ExplorerBlurMica, LGPL-3.0) by Maplespe.
 * IBRA GLASS is a control panel / installer around that engine.
 */
const { app, BrowserWindow, ipcMain, dialog, shell, nativeTheme } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const crypto = require('crypto');
const { execFile } = require('child_process');

const ENGINE_DLL = 'ExplorerBlurMica.dll';
const DATA_ROOT = path.join(process.env.ProgramData || 'C:\\ProgramData', 'IBRA GLASS');
const DEPLOY_ROOT = path.join(DATA_ROOT, 'engine');
const ACTIVE_FILE = path.join(DATA_ROOT, 'active.json');

let win = null;

// ───────────────────────────── helpers
function run(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    execFile(cmd, args, { windowsHide: true, timeout: opts.timeout || 60000, maxBuffer: 32 * 1024 * 1024, encoding: 'utf8' },
      (err, stdout, stderr) => resolve({ code: err ? (typeof err.code === 'number' ? err.code : 1) : 0, stdout: stdout || '', stderr: stderr || '', err }));
  });
}
function ps(script, timeout) {
  return run('powershell.exe', ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-Command', script], { timeout });
}
function sha256(file) {
  try { return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'); } catch { return null; }
}
function readJSON(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; }
}
function writeJSON(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}
function bundledEngineDir() {
  return app.isPackaged ? path.join(process.resourcesPath, 'engine') : path.join(__dirname, '..', 'engine');
}
function engineVersion() {
  try { return fs.readFileSync(path.join(bundledEngineDir(), 'ENGINE_VERSION.txt'), 'utf8').split(/\r?\n/)[0].trim(); }
  catch { return 'unknown'; }
}

const { buildIni, parseIni } = require('./ini');

// ───────────────────────────── system checks
async function isAdmin() {
  const r = await run('net', ['session']);
  return r.code === 0;
}
async function windowsInfo() {
  const rel = os.release(); // e.g. 10.0.26100
  const build = Number(rel.split('.')[2] || 0);
  let displayVersion = '', ubr = '';
  const r = await run('reg', ['query', 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion', '/v', 'DisplayVersion']);
  const m = r.stdout.match(/DisplayVersion\s+REG_SZ\s+(\S+)/);
  if (m) displayVersion = m[1];
  const r2 = await run('reg', ['query', 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion', '/v', 'UBR']);
  const m2 = r2.stdout.match(/UBR\s+REG_DWORD\s+0x([0-9a-f]+)/i);
  if (m2) ubr = String(parseInt(m2[1], 16));
  return { release: rel, build, ubr, isWin11: build >= 22000, displayVersion, arch: process.arch };
}
// Every place in the registry where ExplorerBlurMica.dll is registered (ours or older manual installs)
async function registeredDlls() {
  const found = new Set();
  for (const hive of ['HKLM\\SOFTWARE\\Classes\\CLSID', 'HKCU\\SOFTWARE\\Classes\\CLSID']) {
    const r = await run('reg', ['query', hive, '/s', '/f', ENGINE_DLL, '/d'], { timeout: 90000 });
    for (const line of r.stdout.split(/\r?\n/)) {
      const m = line.match(/REG_(?:EXPAND_)?SZ\s+(.+ExplorerBlurMica\.dll)\s*$/i);
      if (m) found.add(m[1].trim().replace(/^"|"$/g, ''));
    }
  }
  return [...found];
}
function activeDeploy() {
  const a = readJSON(ACTIVE_FILE, null);
  if (a && a.dir && fs.existsSync(path.join(a.dir, ENGINE_DLL))) return a;
  return null;
}

// ───────────────────────────── explorer restart (reopens the folders that were open)
async function restartExplorer() {
  const script = `
$ErrorActionPreference='SilentlyContinue'
$paths=@()
try { $paths=@((New-Object -ComObject Shell.Application).Windows() | Where-Object { $_.FullName -like '*explorer.exe' } | ForEach-Object { $_.Document.Folder.Self.Path } | Where-Object { $_ }) } catch {}
Stop-Process -Name explorer -Force
$ok=$false
for($i=0;$i -lt 20;$i++){ Start-Sleep -Milliseconds 300; if(Get-Process explorer){ $ok=$true; break } }
if(-not $ok){ Start-Process explorer.exe }
Start-Sleep -Milliseconds 1800
$paths | Select-Object -Unique | Select-Object -First 8 | ForEach-Object { Start-Process explorer.exe -ArgumentList ('"' + $_ + '"') }
'done'`;
  const r = await ps(script, 45000);
  return { ok: /done/.test(r.stdout) };
}

// ───────────────────────────── engine install / apply / remove
function deployEngine() {
  const src = bundledEngineDir();
  const srcDll = path.join(src, ENGINE_DLL);
  if (!fs.existsSync(srcDll)) throw new Error('ENGINE_MISSING');
  const ver = engineVersion();
  const hash = sha256(srcDll);
  let dir = path.join(DEPLOY_ROOT, ver);
  const dst = path.join(dir, ENGINE_DLL);
  if (fs.existsSync(dst) && sha256(dst) !== hash) {
    // same version folder but different binary (should not happen) — use a fresh folder; old one may be locked by Explorer
    dir = path.join(DEPLOY_ROOT, `${ver}-${hash.slice(0, 8)}`);
  }
  fs.mkdirSync(dir, { recursive: true });
  for (const f of fs.readdirSync(src)) {
    const from = path.join(src, f), to = path.join(dir, f);
    if (!fs.statSync(from).isFile()) continue;
    if (f.toLowerCase() === 'config.ini' && fs.existsSync(to)) continue;
    if (fs.existsSync(to) && sha256(to) === sha256(from)) continue;
    fs.copyFileSync(from, to);
  }
  return { dir, version: ver, hash };
}

async function installEngine(cfg) {
  const dep = deployEngine();
  fs.writeFileSync(path.join(dep.dir, 'config.ini'), buildIni(cfg), 'utf8');
  // unregister any other copies (older versions / manual installs) so only one engine is active
  for (const p of await registeredDlls()) {
    if (path.resolve(p).toLowerCase() !== path.resolve(path.join(dep.dir, ENGINE_DLL)).toLowerCase() && fs.existsSync(p)) {
      await run('regsvr32', ['/s', '/u', p]);
    }
  }
  const r = await run('regsvr32', ['/s', path.join(dep.dir, ENGINE_DLL)]);
  if (r.code !== 0) throw new Error('REGSVR_FAILED:' + r.code);
  writeJSON(ACTIVE_FILE, { dir: dep.dir, version: dep.version, hash: dep.hash, installedAt: new Date().toISOString() });
  await restartExplorer();
  return { ok: true, dir: dep.dir, version: dep.version };
}

async function applyConfig(cfg, restart = true) {
  const a = activeDeploy();
  if (!a) throw new Error('NOT_INSTALLED');
  fs.writeFileSync(path.join(a.dir, 'config.ini'), buildIni(cfg), 'utf8');
  if (restart) await restartExplorer();
  return { ok: true };
}

async function uninstallEngine(removeFiles) {
  const list = new Set(await registeredDlls());
  const a = activeDeploy();
  if (a) list.add(path.join(a.dir, ENGINE_DLL));
  for (const p of list) if (fs.existsSync(p)) await run('regsvr32', ['/s', '/u', p]);
  await restartExplorer();
  if (removeFiles) {
    await new Promise((r) => setTimeout(r, 1500));
    try { fs.rmSync(DEPLOY_ROOT, { recursive: true, force: true }); } catch { /* a DLL still held by an old process — removed by the uninstaller / next reboot */ }
  }
  try { fs.rmSync(ACTIVE_FILE, { force: true }); } catch {}
  return { ok: true };
}

// ───────────────────────────── user store (styles, favourites, language…)
const storeFile = () => path.join(app.getPath('userData'), 'ibra-glass.json');
const DEFAULT_STORE = { lang: 'ar', favorites: [], custom: [], lastThemeId: 'ibra-gold', previewBg: 'aurora', previewMode: 'dark', uiAccent: '#d4af37' };

// ───────────────────────────── window
function createWindow() {
  const win11 = Number(os.release().split('.')[2] || 0) >= 22621;
  win = new BrowserWindow({
    width: 1240, height: 800, minWidth: 980, minHeight: 640,
    frame: false,
    show: false,
    backgroundColor: win11 ? '#00000000' : '#0b0b10',
    backgroundMaterial: win11 ? 'acrylic' : undefined,
    icon: path.join(__dirname, '..', 'build', 'icon.ico'),
    title: 'IBRA GLASS',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  win.removeMenu();
  win.loadFile(path.join(__dirname, 'renderer', 'index.html'), { query: { glass: win11 ? '1' : '0' } });
  win.once('ready-to-show', () => win.show());
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.on('maximize', () => win.webContents.send('win:state', 'max'));
  win.on('unmaximize', () => win.webContents.send('win:state', 'normal'));
}

if (!app.requestSingleInstanceLock()) { app.quit(); }
else {
  app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
  app.whenReady().then(createWindow);
  app.on('window-all-closed', () => app.quit());
}

// ───────────────────────────── IPC
const wrap = (fn) => async (_e, ...args) => {
  try { return { ok: true, data: await fn(...args) }; }
  catch (e) { return { ok: false, error: String(e && e.message || e) }; }
};

ipcMain.handle('sys:info', wrap(async () => {
  const [winfo, admin, regs] = await Promise.all([windowsInfo(), isAdmin(), registeredDlls()]);
  const a = activeDeploy();
  let config = null;
  if (a) { try { config = parseIni(fs.readFileSync(path.join(a.dir, 'config.ini'), 'utf8')); } catch {} }
  const activeDll = a ? path.join(a.dir, ENGINE_DLL).toLowerCase() : null;
  return {
    win: winfo, admin,
    appVersion: app.getVersion(),
    engine: { bundled: fs.existsSync(path.join(bundledEngineDir(), ENGINE_DLL)), version: engineVersion() },
    active: a,
    registered: regs,
    installed: !!(a && regs.some((p) => p.toLowerCase() === activeDll)),
    foreign: regs.filter((p) => p.toLowerCase() !== activeDll),
    // a newer engine came with an app update → re-deploy on next apply
    needsUpgrade: !!(a && fs.existsSync(path.join(bundledEngineDir(), ENGINE_DLL)) && a.hash !== sha256(path.join(bundledEngineDir(), ENGINE_DLL))),
    config,
    systemDark: nativeTheme.shouldUseDarkColors
  };
}));
ipcMain.handle('engine:install', wrap((cfg) => installEngine(cfg)));
ipcMain.handle('engine:apply', wrap((cfg, restart) => applyConfig(cfg, restart !== false)));
ipcMain.handle('engine:uninstall', wrap((removeFiles) => uninstallEngine(!!removeFiles)));
ipcMain.handle('explorer:restart', wrap(() => restartExplorer()));
ipcMain.handle('engine:openFolder', wrap(async () => {
  const a = activeDeploy();
  await shell.openPath(a ? a.dir : bundledEngineDir());
  return true;
}));
ipcMain.handle('ini:preview', wrap((cfg) => buildIni(cfg)));

ipcMain.handle('store:get', wrap(() => ({ ...DEFAULT_STORE, ...readJSON(storeFile(), {}) })));
ipcMain.handle('store:set', wrap((data) => { writeJSON(storeFile(), { ...DEFAULT_STORE, ...readJSON(storeFile(), {}), ...data }); return true; }));

ipcMain.handle('theme:export', wrap(async (themes) => {
  const r = await dialog.showSaveDialog(win, {
    title: 'IBRA GLASS', defaultPath: `ibra-glass-styles.ibraglass`,
    filters: [{ name: 'IBRA GLASS', extensions: ['ibraglass', 'json'] }]
  });
  if (r.canceled || !r.filePath) return false;
  writeJSON(r.filePath, { app: 'IBRA GLASS', format: 1, themes });
  return r.filePath;
}));
ipcMain.handle('theme:import', wrap(async () => {
  const r = await dialog.showOpenDialog(win, {
    title: 'IBRA GLASS', properties: ['openFile'],
    filters: [{ name: 'IBRA GLASS / config.ini', extensions: ['ibraglass', 'json', 'ini'] }]
  });
  if (r.canceled || !r.filePaths[0]) return null;
  const file = r.filePaths[0];
  const text = fs.readFileSync(file, 'utf8');
  if (/\.ini$/i.test(file)) {
    const c = parseIni(text);
    return [{ ...c, ar: path.basename(file, '.ini'), en: path.basename(file, '.ini') }];
  }
  const j = JSON.parse(text);
  return Array.isArray(j) ? j : (j.themes || []);
}));
ipcMain.handle('preview:pickImage', wrap(async () => {
  const r = await dialog.showOpenDialog(win, { properties: ['openFile'], filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'webp', 'bmp'] }] });
  if (r.canceled || !r.filePaths[0]) return null;
  const buf = fs.readFileSync(r.filePaths[0]);
  if (buf.length > 12 * 1024 * 1024) throw new Error('IMAGE_TOO_BIG');
  const ext = path.extname(r.filePaths[0]).slice(1).toLowerCase().replace('jpg', 'jpeg');
  return `data:image/${ext};base64,${buf.toString('base64')}`;
}));
ipcMain.handle('open:url', wrap((url) => { if (/^https?:\/\//.test(url)) shell.openExternal(url); return true; }));

ipcMain.on('win:min', () => win && win.minimize());
ipcMain.on('win:max', () => win && (win.isMaximized() ? win.unmaximize() : win.maximize()));
ipcMain.on('win:close', () => win && win.close());

