/* IBRA GLASS — renderer */
'use strict';
(() => {
  // ───────────────────────── i18n
  const I18N = {
    ar: {
      tagline: 'زجاج لمستكشف الملفات', nav_styles: 'الستايلات', nav_editor: 'تخصيص', nav_system: 'التنصيب', nav_about: 'حول',
      mode_dark: 'داكن', mode_light: 'فاتح', search: 'ابحث عن ستايل…', random: 'عشوائي 🎲', edit_this: 'عدّل عليه',
      apply: 'طبّق الستايل', install_apply: 'ثبّت وطبّق', fav_add: '☆ أضف للمفضلة', fav_rm: '★ بالمفضلة',
      st_on: 'مفعّل', st_off: 'غير مثبّت', st_chk: 'جاري الفحص…', applied: 'مطبّق',
      editor_title: 'محرّر الستايل', editor_sub: 'كل تغيير يبين بالمعاينة فوراً', save_mine: 'احفظ بستايلاتي',
      effect: 'نوع التأثير', tint_light: 'لون الوضع الفاتح', tint_light_sub: 'يستخدم لما ويندوز على الثيم الفاتح',
      tint_dark: 'لون الوضع الداكن', tint_dark_sub: 'يستخدم لما ويندوز على الثيم الداكن', opacity: 'الكثافة',
      options: 'خيارات إضافية', o_addr: 'شريط عنوان شفاف', o_addr_s: 'يشيل خلفية شريط العنوان',
      o_bar: 'شريط تمرير شفاف', o_bar_s: 'يرسم شريط تمرير خاص بدون خلفية',
      o_winui: 'شريط الأدوات شفاف (ويندوز 11)', o_winui_s: 'يشيل خلفية شريط الأوامر الحديث',
      o_line: 'خط فاصل', o_line_s: 'خط بين القائمة الجانبية والملفات',
      ini_preview: 'عرض ملف الإعدادات (config.ini)', import: 'استيراد ستايل', export: 'تصدير ستايلاتي',
      restart_explorer: 'إعادة تشغيل المستكشف', c_windows: 'نظام التشغيل', c_engine: 'المحرك', c_admin: 'الصلاحيات',
      c_admin_s: 'التنصيب يحتاج صلاحية مسؤول', c_location: 'مكان المحرك', open_folder: 'افتح المجلد',
      uninstall_title: 'إزالة التأثير', uninstall_sub: 'يرجّع المستكشف لشكله الأصلي', rm_files: 'احذف ملفات المحرك', uninstall: 'إزالة',
      safe_title: 'وضع الأمان:', safe_body: 'إذا صار أي خلل بالمستكشف، اضغط ESC مطوّل وانت تفتح المستكشف، وهو يشتغل بدون التأثير، وبعدها افتح IBRA GLASS واضغط "إزالة".',
      hs_on: 'التأثير مفعّل على المستكشف', hs_on_s: 'تكدر تبدّل الستايل بأي وقت من صفحة الستايلات',
      hs_off: 'التأثير غير مثبّت بعد', hs_off_s: 'اختار ستايل واضغط "ثبّت وطبّق" — يحتاج إعادة تشغيل المستكشف لثواني',
      hs_nobundle: 'المحرك غير موجود داخل البرنامج', hs_nobundle_s: 'هاي نسخة تطوير — نسخة المنصّب تجي ويا المحرك جاهز',
      admin_yes: 'مسؤول ✓', admin_no: 'مستخدم عادي', busy_install: 'جاري التنصيب وإعادة تشغيل المستكشف…',
      busy_apply: 'جاري تطبيق الستايل…', busy_restart: 'جاري إعادة تشغيل المستكشف…', busy_uninstall: 'جاري الإزالة…',
      done_install: 'تم التنصيب ✓ افتح المستكشف وشوف', done_apply: 'تم تطبيق الستايل ✓', done_uninstall: 'رجع المستكشف لشكله الأصلي',
      done_restart: 'تم ✓', err: 'صار خطأ: ', confirm: 'تأكيد', cancel: 'إلغاء', save: 'حفظ',
      name_title: 'اسم الستايل', name_ph: 'مثلاً: ذهبي المحل',
      un_confirm: 'راح يرجع المستكشف لشكله الأصلي ويعيد تشغيله. متأكد؟',
      foreign: 'لكينا نسخة ثانية من المحرك مثبتة يدوياً بمكان آخر — IBRA GLASS راح يوقفها تلقائياً عند التنصيب حتى ما يتعارضون:',
      eff_na_w10: 'ما يشتغل على ويندوز 10', eff_na_new: 'ممكن ما يشتغل على نسختك من ويندوز 11',
      imported: 'تم استيراد', exported: 'تم التصدير', saved: 'تم الحفظ بستايلاتي', del_q: 'تحذف هذا الستايل؟',
      bg_custom: 'خلفية من جهازك', draft: 'ستايل مخصّص (غير محفوظ)',
      about_lead: 'برنامج يحوّل خلفية مستكشف ملفات ويندوز إلى زجاج: ضبابي أو أكريليك أو مايكا، ويا عشرات الستايلات الجاهزة ومحرّر ألوان ومعاينة مباشرة. يشتغل على ويندوز 10 و11.',
      made_by: 'تصميم وتطوير', author: 'إبراهيم الخزرجي',
      engine_credit_t: 'المحرك',
      engine_credit_b: 'التأثير الزجاجي داخل المستكشف ينفّذه محرك ExplorerBlurMica من تطوير Maplespe، وهو مرخّص بـ LGPL-3.0 ومضمّن بدون أي تعديل، وملفات رخصته مرفقة ويا البرنامج. كل الشكر لصاحبه.',
      win_unknown: 'غير معروف', win_preview_note: 'المعاينة تقريبية — الشكل الحقيقي يعتمد على خلفية سطح المكتب وإعدادات ويندوز.',
      only_win: 'هذي معاينة متصفح — التنصيب يشتغل داخل البرنامج على ويندوز'
    },
    en: {
      tagline: 'Glass for File Explorer', nav_styles: 'Styles', nav_editor: 'Customize', nav_system: 'Install', nav_about: 'About',
      mode_dark: 'Dark', mode_light: 'Light', search: 'Search styles…', random: 'Random 🎲', edit_this: 'Customize it',
      apply: 'Apply style', install_apply: 'Install & apply', fav_add: '☆ Add to favorites', fav_rm: '★ In favorites',
      st_on: 'Active', st_off: 'Not installed', st_chk: 'Checking…', applied: 'Applied',
      editor_title: 'Style editor', editor_sub: 'Every change shows in the preview instantly', save_mine: 'Save to my styles',
      effect: 'Effect', tint_light: 'Light mode tint', tint_light_sub: 'Used when Windows is in light mode',
      tint_dark: 'Dark mode tint', tint_dark_sub: 'Used when Windows is in dark mode', opacity: 'Strength',
      options: 'Extra options', o_addr: 'Transparent address bar', o_addr_s: 'Removes the address bar background',
      o_bar: 'Transparent scrollbar', o_bar_s: 'Draws a custom scrollbar without background',
      o_winui: 'Transparent toolbar (Windows 11)', o_winui_s: 'Removes the modern command bar background',
      o_line: 'Divider line', o_line_s: 'Line between navigation pane and files',
      ini_preview: 'Show settings file (config.ini)', import: 'Import style', export: 'Export my styles',
      restart_explorer: 'Restart Explorer', c_windows: 'Operating system', c_engine: 'Engine', c_admin: 'Permissions',
      c_admin_s: 'Installing needs administrator rights', c_location: 'Engine location', open_folder: 'Open folder',
      uninstall_title: 'Remove the effect', uninstall_sub: 'Returns Explorer to its original look', rm_files: 'Delete engine files', uninstall: 'Remove',
      safe_title: 'Safe mode:', safe_body: 'If Explorer ever misbehaves, hold ESC while opening Explorer to start it without the effect, then open IBRA GLASS and press "Remove".',
      hs_on: 'The effect is active in Explorer', hs_on_s: 'Switch styles any time from the Styles page',
      hs_off: 'The effect is not installed yet', hs_off_s: 'Pick a style and press "Install & apply" — Explorer restarts for a few seconds',
      hs_nobundle: 'Engine not bundled', hs_nobundle_s: 'This is a dev build — the installer version ships with the engine',
      admin_yes: 'Administrator ✓', admin_no: 'Standard user', busy_install: 'Installing and restarting Explorer…',
      busy_apply: 'Applying style…', busy_restart: 'Restarting Explorer…', busy_uninstall: 'Removing…',
      done_install: 'Installed ✓ open Explorer and enjoy', done_apply: 'Style applied ✓', done_uninstall: 'Explorer is back to normal',
      done_restart: 'Done ✓', err: 'Error: ', confirm: 'Confirm', cancel: 'Cancel', save: 'Save',
      name_title: 'Style name', name_ph: 'e.g. Studio Gold',
      un_confirm: 'Explorer will return to its original look and restart. Continue?',
      foreign: 'Another copy of the engine is registered elsewhere (manual install) — IBRA GLASS will switch it off automatically when installing:',
      eff_na_w10: 'Not available on Windows 10', eff_na_new: 'May not work on your Windows 11 build',
      imported: 'Imported', exported: 'Exported', saved: 'Saved to my styles', del_q: 'Delete this style?',
      bg_custom: 'Wallpaper from your PC', draft: 'Custom style (unsaved)',
      about_lead: 'Turns the Windows File Explorer background into glass — blur, acrylic or mica — with dozens of ready styles, a colour editor and a live preview. Works on Windows 10 and 11.',
      made_by: 'Designed & developed by', author: 'Ibrahim Al-Khazraji',
      engine_credit_t: 'Engine',
      engine_credit_b: 'The glass effect inside Explorer is rendered by the ExplorerBlurMica engine by Maplespe, licensed under LGPL-3.0 and bundled unmodified; its license files ship with this app. All credit to its author.',
      win_unknown: 'Unknown', win_preview_note: 'Preview is approximate — the real look depends on your wallpaper and Windows settings.',
      only_win: 'Browser preview — installing works inside the app on Windows'
    }
  };

  // ───────────────────────── bridge (falls back to a mock so the UI can be previewed in a browser)
  const api = window.ibra || (() => {
    const mem = { lang: 'ar', favorites: ['ibra-gold'], custom: [], lastThemeId: 'ibra-gold', previewBg: 'aurora', previewMode: 'dark' };
    let installed = false, cfg = null;
    const ok = (data) => Promise.resolve({ ok: true, data });
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    return {
      mock: true,
      info: () => ok({ win: { build: 26100, ubr: '2314', isWin11: true, displayVersion: '24H2' }, admin: true, appVersion: '1.0.0',
        engine: { bundled: true, version: '2.1.0' }, active: installed ? { dir: 'C:\\ProgramData\\IBRA GLASS\\engine\\2.1.0' } : null,
        registered: [], installed, foreign: [], config: cfg, systemDark: true }),
      install: async (c) => { await wait(900); installed = true; cfg = c; return { ok: true }; },
      apply: async (c) => { await wait(600); cfg = c; return { ok: true }; },
      uninstall: async () => { await wait(600); installed = false; cfg = null; return { ok: true }; },
      restartExplorer: async () => { await wait(500); return { ok: true }; },
      openEngineFolder: () => ok(true),
      iniPreview: (c) => ok(buildIniLocal(c)),
      storeGet: () => ok({ ...mem }), storeSet: (d) => { Object.assign(mem, d); return ok(true); },
      exportThemes: () => ok(false), importThemes: () => ok(null), pickImage: () => ok(null),
      openUrl: (u) => { window.open(u, '_blank'); return ok(true); },
      win: { min() {}, max() {}, close() {}, onState() {} }
    };
  })();
  function buildIniLocal(c) {
    const b = (v) => (v ? 'true' : 'false');
    return `[config]\neffect=${c.effect}\nclearAddress=${b(c.clearAddress)}\nclearBarBg=${b(c.clearBarBg)}\nclearWinUIBg=${b(c.clearWinUIBg)}\nshowLine=${b(c.showLine)}\n[light]\nr=${c.light[0]}\ng=${c.light[1]}\nb=${c.light[2]}\na=${c.light[3]}\n[dark]\nr=${c.dark[0]}\ng=${c.dark[1]}\nb=${c.dark[2]}\na=${c.dark[3]}`;
  }

  // ───────────────────────── wallpapers for the preview
  const BGS = {
    aurora:  'radial-gradient(60% 70% at 20% 30%,#1fd1a5 0,transparent 60%),radial-gradient(50% 60% at 80% 20%,#7a4dff 0,transparent 60%),radial-gradient(70% 80% at 60% 100%,#0a5bd8 0,transparent 60%),#0a0f24',
    gold:    'radial-gradient(45% 55% at 30% 40%,#f3d36b 0,transparent 60%),radial-gradient(40% 50% at 75% 70%,#a9741c 0,transparent 65%),radial-gradient(30% 30% at 85% 15%,#fff2c4 0,transparent 60%),#0d0a05',
    baghdad: 'radial-gradient(60% 50% at 50% 100%,#ff7a3d 0,transparent 65%),radial-gradient(50% 60% at 20% 30%,#6b2fb3 0,transparent 60%),radial-gradient(40% 40% at 85% 25%,#ff3d8a 0,transparent 60%),#160b2a',
    ocean:   'radial-gradient(60% 60% at 25% 75%,#00c6ff 0,transparent 60%),radial-gradient(55% 60% at 75% 25%,#0057ff 0,transparent 60%),#021432',
    sakura:  'radial-gradient(55% 55% at 30% 35%,#ffb3d1 0,transparent 60%),radial-gradient(50% 55% at 75% 70%,#ff6fa5 0,transparent 60%),radial-gradient(40% 40% at 80% 15%,#ffe3ef 0,transparent 60%),#3a1028',
    forest:  'radial-gradient(60% 60% at 30% 70%,#2fbf71 0,transparent 60%),radial-gradient(50% 50% at 75% 30%,#b6e05a 0,transparent 60%),#06200f',
    mono:    'radial-gradient(60% 60% at 30% 30%,#9aa0a6 0,transparent 60%),radial-gradient(50% 60% at 75% 75%,#3c4043 0,transparent 60%),#111'
  };

  // ───────────────────────── state
  let lang = 'ar', store = null, info = null;
  let mode = 'dark';
  let selected = null;       // theme object from gallery
  let work = null;           // config being edited/applied
  let cat = 'all', query = '';
  let customBg = null;

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const t = (k) => (I18N[lang][k] ?? I18N.ar[k] ?? k);
  const nameOf = (th) => (th ? (lang === 'ar' ? (th.ar || th.en) : (th.en || th.ar)) : '');
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const allThemes = () => [...window.IBRA_THEMES, ...(store?.custom || [])];
  const effOf = (v) => window.IBRA_EFFECTS.find((e) => e.v === Number(v)) || window.IBRA_EFFECTS[1];

  const rgba = (c) => `rgba(${c[0]},${c[1]},${c[2]},${(c[3] / 255).toFixed(3)})`;
  const hex = (c) => '#' + c.slice(0, 3).map((n) => Number(n).toString(16).padStart(2, '0')).join('');
  const fromHex = (h) => { const m = /^#?([0-9a-f]{6})$/i.exec(h.trim()); if (!m) return null; const n = parseInt(m[1], 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const cfgOf = (th) => ({ effect: th.effect, light: [...th.light], dark: [...th.dark], clearAddress: !!th.clearAddress, clearBarBg: !!th.clearBarBg, clearWinUIBg: !!th.clearWinUIBg, showLine: !!th.showLine });
  const sameCfg = (a, b) => a && b && Number(a.effect) === Number(b.effect) && ['clearAddress', 'clearBarBg', 'clearWinUIBg', 'showLine'].every((k) => !!a[k] === !!b[k])
    && a.light.every((v, i) => Number(v) === Number(b.light[i])) && a.dark.every((v, i) => Number(v) === Number(b.dark[i]));

  const bgCss = (key) => (key === 'custom' && customBg ? `url("${customBg}") center/cover` : (BGS[key] || BGS.aurora));
  const save = (d) => { Object.assign(store, d); api.storeSet(d); };

  // ───────────────────────── toasts, busy, modal
  function toast(msg, kind = '') {
    const el = document.createElement('div');
    el.className = 'toast ' + kind; el.textContent = msg;
    $('#toasts').appendChild(el);
    setTimeout(() => el.remove(), 3800);
  }
  function busy(on, msg) { $('#busy').hidden = !on; if (msg) $('#busyTxt').textContent = msg; }
  function modal(title, bodyHtml, actions) {
    return new Promise((resolve) => {
      $('#mTitle').textContent = title;
      $('#mBody').innerHTML = bodyHtml;
      const box = $('#mActions'); box.innerHTML = '';
      actions.forEach((a) => {
        const b = document.createElement('button');
        b.className = a.primary ? 'primary' : (a.danger ? 'danger-btn' : 'ghost');
        b.textContent = a.label;
        b.onclick = () => { $('#modal').hidden = true; resolve(a.value); };
        box.appendChild(b);
      });
      $('#modal').hidden = false;
      const inp = $('#mBody input'); if (inp) { inp.focus(); inp.onkeydown = (e) => { if (e.key === 'Enter') { $('#modal').hidden = true; resolve('ok'); } }; }
    });
  }
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ───────────────────────── explorer preview
  function explorerMarkup() {
    const files = [['folder', 'Projects'], ['folder', 'Tattoo designs'], ['folder', 'Clients'], ['img', 'cover.png'], ['img', 'design-01.jpg'],
      ['vid', 'reel.mp4'], ['doc', 'invoice.docx'], ['folder', 'Music'], ['img', 'logo.png'], ['doc', 'notes.txt']];
    return `
      <div class="deco"></div>
      <div class="xw">
        <div class="glassbg"></div><div class="tintbg"></div><div class="noise"></div>
        <div class="xw-tabs"><div class="xw-tab"><span class="fi"></span>IBRA Studio</div><div class="xw-dots"><span>—</span><span>☐</span><span>✕</span></div></div>
        <div class="xw-bar"><div class="xw-nav"><span></span><span></span><span></span></div><div class="xw-addr">💻 › This PC › Desktop › IBRA Studio</div><div class="xw-search">🔍 Search</div></div>
        <div class="xw-cmd"><b>＋ New</b><span>✂</span><span>⧉</span><span>📋</span><span>⇅ Sort</span><span>☰ View</span><span>⋯</span></div>
        <div class="xw-main">
          <div class="xw-side">
            <div><i style="background:#4fc3ff"></i>Home</div><div><i style="background:#e8c35a"></i>Gallery</div>
            <div class="sel"><i style="background:#e8c35a"></i>Desktop</div><div><i style="background:#4fc3ff"></i>Downloads</div>
            <div><i style="background:#ff8fb8"></i>Pictures</div><div><i style="background:#a06bff"></i>Videos</div><div><i style="background:#999"></i>This PC</div>
          </div>
          <div class="xw-files">${files.map((f, i) => `<div class="xw-file${i === 1 ? ' sel' : ''}"><div class="ic ${f[0]}"></div>${f[1]}</div>`).join('')}</div>
        </div>
        <div class="xw-status">10 items · 1 selected</div>
      </div>
      <div class="taskbar"><span></span><span class="on"></span><span></span><span></span><span></span></div>
      <div class="badge" hidden></div>`;
  }
  function paintStage(stage, cfg, m, bgKey) {
    if (!stage.firstChild) stage.innerHTML = explorerMarkup();
    stage.style.background = bgCss(bgKey);
    const xw = $('.xw', stage), g = $('.glassbg', xw), tint = $('.tintbg', xw), noise = $('.noise', xw);
    const dark = m === 'dark';
    const e = Number(cfg.effect);
    const c = dark ? cfg.dark : cfg.light;
    let filter = 'blur(26px) saturate(150%)', tintBg = rgba(c), base = 'transparent';
    if (e === 0) filter = 'blur(12px) saturate(120%)';
    if (e === 3) { filter = 'blur(16px)'; tintBg = 'transparent'; }
    if (e === 2) { filter = 'blur(70px) saturate(115%)'; tintBg = 'transparent'; base = dark ? 'rgba(32,32,32,.80)' : 'rgba(243,243,243,.80)'; }
    if (e === 4) { filter = 'blur(60px) saturate(140%)'; tintBg = 'transparent'; base = dark ? 'rgba(18,18,22,.62)' : 'rgba(235,235,238,.62)'; }
    g.style.backdropFilter = filter;
    g.style.background = base;
    tint.style.background = tintBg;
    noise.style.display = e === 1 ? '' : 'none';

    const fg = dark ? '#f2f2f2' : '#141414';
    const solidBar = dark ? 'rgba(43,43,43,.96)' : 'rgba(249,249,249,.96)';
    xw.style.setProperty('--xw-fg', fg);
    xw.style.setProperty('--xw-tab', dark ? 'rgba(255,255,255,.08)' : 'rgba(255,255,255,.55)');
    xw.style.setProperty('--xw-bar', cfg.clearWinUIBg ? 'transparent' : solidBar);
    xw.style.setProperty('--xw-cmd', cfg.clearWinUIBg ? 'transparent' : solidBar);
    xw.style.setProperty('--xw-addr', cfg.clearAddress ? (dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.05)') : (dark ? '#2d2d2d' : '#ffffff'));
    xw.style.setProperty('--xw-sel', dark ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.08)');
    xw.style.setProperty('--xw-line', dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)');
    xw.style.setProperty('--xw-line-side', cfg.showLine ? (dark ? 'rgba(255,255,255,.18)' : 'rgba(0,0,0,.15)') : 'transparent');

    const badge = $('.badge', stage);
    const warn = effectWarning(e);
    badge.hidden = !warn; badge.textContent = warn ? '⚠ ' + warn : '';
  }
  function effectWarning(e) {
    if (!info?.win?.build) return '';
    if ((e === 2 || e === 4) && !info.win.isWin11) return t('eff_na_w10');
    if (e === 0 && info.win.build > 22621) return t('eff_na_new');
    return '';
  }

  // ───────────────────────── gallery
  function renderChips() {
    const counts = { all: allThemes().length, fav: store.favorites.length, mine: store.custom.length };
    window.IBRA_THEMES.forEach((th) => { counts[th.cat] = (counts[th.cat] || 0) + 1; });
    $('#chips').innerHTML = window.IBRA_CATEGORIES.filter((c) => c.id !== 'mine' || counts.mine).map((c) =>
      `<button class="chip${c.id === cat ? ' on' : ''}" data-cat="${c.id}">${lang === 'ar' ? c.ar : c.en}<small>${counts[c.id] || 0}</small></button>`).join('');
    $$('#chips .chip').forEach((b) => b.onclick = () => { cat = b.dataset.cat; renderChips(); renderGrid(); });
  }
  function filtered() {
    let list = allThemes();
    if (cat === 'fav') list = list.filter((x) => store.favorites.includes(x.id));
    else if (cat === 'mine') list = store.custom;
    else if (cat !== 'all') list = list.filter((x) => x.cat === cat);
    if (query) { const q = query.toLowerCase(); list = list.filter((x) => (x.ar + ' ' + x.en).toLowerCase().includes(q)); }
    return list;
  }
  function renderGrid() {
    const list = filtered();
    const bg = bgCss(store.previewBg);
    const live = info?.config;
    $('#grid').innerHTML = list.length ? list.map((th) => {
      const fav = store.favorites.includes(th.id);
      const isLive = info?.installed && live && sameCfg(cfgOf(th), live);
      const eff = effOf(th.effect);
      const lt = th.effect >= 2 && th.effect !== 3 ? (th.effect === 2 ? 'rgba(243,243,243,.8)' : 'rgba(235,235,238,.6)') : (th.effect === 3 ? 'transparent' : rgba(th.light));
      const dk = th.effect >= 2 && th.effect !== 3 ? (th.effect === 2 ? 'rgba(32,32,32,.8)' : 'rgba(18,18,22,.62)') : (th.effect === 3 ? 'transparent' : rgba(th.dark));
      return `<div class="tcard${selected && selected.id === th.id ? ' on' : ''}" data-id="${esc(th.id)}" role="button" tabindex="0">
        <div class="tthumb" style="background:${bg}">
          <div class="half l" style="background:${lt}"></div><div class="half d" style="background:${dk}"></div>
          <div class="bar"></div><div class="bar2"></div>
        </div>
        ${isLive ? `<span class="live">${t('applied')}</span>` : ''}
        <button class="fav${fav ? ' on' : ''}" data-fav="${esc(th.id)}"><svg viewBox="0 0 24 24"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/></svg></button>
        ${th.cat === 'mine' ? `<button class="del" data-del="${esc(th.id)}">✕</button>` : ''}
        <div class="tinfo"><b>${esc(nameOf(th))}</b><small>${lang === 'ar' ? eff.ar.split(' (')[0] : eff.en}</small></div>
      </div>`;
    }).join('') : `<div class="empty">—</div>`;
    $$('#grid .tcard').forEach((el) => {
      el.onclick = (e) => {
        if (e.target.closest('[data-fav]') || e.target.closest('[data-del]')) return;
        select(allThemes().find((x) => x.id === el.dataset.id));
      };
    });
    $$('#grid [data-fav]').forEach((b) => b.onclick = () => toggleFav(b.dataset.fav));
    $$('#grid [data-del]').forEach((b) => b.onclick = async () => {
      if (await modal(t('del_q'), '', [{ label: t('cancel'), value: null }, { label: t('confirm'), value: 'ok', danger: true }]) !== 'ok') return;
      save({ custom: store.custom.filter((x) => x.id !== b.dataset.del), favorites: store.favorites.filter((x) => x !== b.dataset.del) });
      renderChips(); renderGrid();
    });
  }
  function toggleFav(id) {
    const f = new Set(store.favorites);
    f.has(id) ? f.delete(id) : f.add(id);
    save({ favorites: [...f] });
    renderChips(); renderGrid(); renderPreviewHead();
  }
  function select(th) {
    if (!th) return;
    selected = th; work = cfgOf(th);
    save({ lastThemeId: th.id });
    renderGrid(); renderPreviewHead(); paintAll(); syncEditor();
  }

  // ───────────────────────── preview header / apply buttons
  function renderPreviewHead() {
    const th = selected;
    const edited = th && !sameCfg(cfgOf(th), work);
    $('#pvName').textContent = edited ? t('draft') : nameOf(th);
    const eff = effOf(work.effect);
    $('#pvMeta').textContent = `${lang === 'ar' ? eff.ar : eff.en} · ${lang === 'ar' ? eff.note_ar : eff.note_en}`;
    $('#favBtn').textContent = th && store.favorites.includes(th.id) ? t('fav_rm') : t('fav_add');
    $('#favBtn').classList.toggle('on', !!(th && store.favorites.includes(th.id)));
    const label = info?.installed ? t('apply') : t('install_apply');
    $('#applyBtn').textContent = label; $('#applyBtn2').textContent = label;
    $('#applyHint').textContent = api.mock ? t('only_win') : t('win_preview_note');
  }
  function paintAll() {
    paintStage($('#stage'), work, mode, store.previewBg);
    paintStage($('#stage2'), work, mode, store.previewBg);
  }
  function renderBgRow() {
    const keys = Object.keys(BGS);
    $('#bgRow').innerHTML = keys.map((k) => `<button class="bgsw${store.previewBg === k ? ' on' : ''}" data-bg="${k}" style="background:${BGS[k]}"></button>`).join('')
      + (customBg ? `<button class="bgsw${store.previewBg === 'custom' ? ' on' : ''}" data-bg="custom" style="background:url('${customBg}') center/cover"></button>` : '')
      + `<button class="bgsw add" id="bgAdd" title="${t('bg_custom')}">＋</button>`;
    $$('#bgRow [data-bg]').forEach((b) => b.onclick = () => { save({ previewBg: b.dataset.bg }); renderBgRow(); paintAll(); renderGrid(); });
    $('#bgAdd').onclick = async () => {
      const r = await api.pickImage();
      if (r.ok && r.data) { customBg = r.data; save({ customBg, previewBg: 'custom' }); renderBgRow(); paintAll(); renderGrid(); }
      else if (!r.ok) toast(t('err') + r.error, 'err');
    };
  }
  function setMode(m) {
    mode = m; save({ previewMode: m });
    $$('[data-mode]').forEach((b) => b.classList.toggle('on', b.dataset.mode === m));
    paintAll();
  }

  // ───────────────────────── editor
  function renderEffects() {
    $('#effects').innerHTML = window.IBRA_EFFECTS.map((e) => {
      const w = effectWarning(e.v);
      return `<button class="eff${Number(work.effect) === e.v ? ' on' : ''}${w ? ' na' : ''}" data-eff="${e.v}"><b>${lang === 'ar' ? e.ar : e.en}</b><small>${w || (lang === 'ar' ? e.note_ar : e.note_en)}</small></button>`;
    }).join('');
    $$('#effects .eff').forEach((b) => b.onclick = () => { work.effect = Number(b.dataset.eff); changed(); renderEffects(); });
  }
  function syncEditor() {
    renderEffects();
    $$('.tint').forEach((box) => {
      const c = work[box.dataset.k];
      $('.tc', box).value = hex(c); $('.hex', box).value = hex(c).toUpperCase();
      $('.ta', box).value = c[3]; $('.tav', box).textContent = Math.round(c[3] / 2.55) + '%';
    });
    $$('[data-opt]').forEach((i) => { i.checked = !!work[i.dataset.opt]; });
    const tintsOff = [2, 3, 4].includes(Number(work.effect));
    $$('.tint').forEach((box) => { box.style.opacity = tintsOff ? .45 : 1; });
    updateIni();
  }
  function updateIni() { api.iniPreview(work).then((r) => { if (r.ok) $('#iniPre').textContent = r.data; }); }
  function changed() { renderPreviewHead(); paintAll(); syncEditor(); }
  function bindEditor() {
    $$('.tint').forEach((box) => {
      const k = box.dataset.k;
      $('.tc', box).oninput = (e) => { const c = fromHex(e.target.value); if (c) { work[k] = [...c, work[k][3]]; changed(); } };
      $('.hex', box).onchange = (e) => { const c = fromHex(e.target.value); if (c) { work[k] = [...c, work[k][3]]; changed(); } else syncEditor(); };
      $('.ta', box).oninput = (e) => { work[k][3] = Number(e.target.value); changed(); };
    });
    $$('[data-opt]').forEach((i) => i.onchange = () => { work[i.dataset.opt] = i.checked; changed(); });
    const sw = [['#d4af37', '#000000'], ['#ffffff', '#101014'], ['#f4c4be', '#46222a'], ['#aae1c3', '#06301f'], ['#aac3f0', '#0a163c'], ['#d7c8ff', '#28184a'], ['#ffd2b4', '#462814'], ['#78f0ff', '#001e28'], ['#ff78dc', '#320028'], ['#ebd2aa', '#3c2a12']];
    $('#swatches').innerHTML = `<span class="lbl">${lang === 'ar' ? 'ألوان سريعة (فاتح / داكن)' : 'Quick colours (light / dark)'}</span>` + sw.map(([l, d]) =>
      `<button data-l="${l}" data-d="${d}" style="background:linear-gradient(135deg,${l} 50%,${d} 50%)"></button>`).join('');
    $$('#swatches button').forEach((b) => b.onclick = () => {
      work.light = [...fromHex(b.dataset.l), work.light[3]]; work.dark = [...fromHex(b.dataset.d), work.dark[3]];
      if ([2, 3, 4].includes(Number(work.effect))) work.effect = 1;
      changed();
    });
  }
  async function saveMine() {
    const r = await modal(t('name_title'), `<input type="text" id="nmIn" placeholder="${esc(t('name_ph'))}">`, [{ label: t('cancel'), value: null }, { label: t('save'), value: 'ok', primary: true }]);
    if (r !== 'ok') return;
    const name = ($('#nmIn')?.value || '').trim() || t('name_ph');
    const th = { id: 'mine-' + Date.now(), cat: 'mine', ar: name, en: name, ...clone(work) };
    save({ custom: [...store.custom, th] });
    selected = th; cat = 'mine';
    renderChips(); renderGrid(); renderPreviewHead();
    toast(t('saved'), 'ok');
  }

  // ───────────────────────── engine actions
  async function doApply() {
    if (info && !info.engine.bundled && !api.mock) { toast(t('hs_nobundle'), 'err'); return; }
    const installing = !info?.installed || !!info?.needsUpgrade;
    busy(true, installing ? t('busy_install') : t('busy_apply'));
    const r = installing ? await api.install(work) : await api.apply(work, true);
    busy(false);
    if (r.ok) toast(installing ? t('done_install') : t('done_apply'), 'ok');
    else toast(t('err') + r.error, 'err');
    await refreshInfo();
  }
  async function doUninstall() {
    if (await modal(t('uninstall_title'), `<p>${t('un_confirm')}</p>`, [{ label: t('cancel'), value: null }, { label: t('uninstall'), value: 'ok', danger: true }]) !== 'ok') return;
    busy(true, t('busy_uninstall'));
    const r = await api.uninstall($('#rmFiles').checked);
    busy(false);
    r.ok ? toast(t('done_uninstall'), 'ok') : toast(t('err') + r.error, 'err');
    await refreshInfo();
  }
  async function doRestart() {
    busy(true, t('busy_restart'));
    const r = await api.restartExplorer();
    busy(false);
    r.ok ? toast(t('done_restart'), 'ok') : toast(t('err') + r.error, 'err');
  }

  // ───────────────────────── system page
  async function refreshInfo() {
    const pill = $('#statusPill');
    pill.className = 'pill'; $('span', pill).textContent = t('st_chk');
    const r = await api.info();
    if (!r.ok) { toast(t('err') + r.error, 'err'); return; }
    info = r.data;
    renderSystem(); renderPreviewHead(); renderGrid(); renderEffects();
  }
  function renderSystem() {
    if (!info) return;
    const pill = $('#statusPill');
    pill.className = 'pill ' + (info.installed ? 'ok' : 'off');
    $('span', pill).textContent = info.installed ? t('st_on') : t('st_off');

    const hs = $('#heroStatus');
    const bundled = info.engine.bundled;
    hs.className = 'hero-status ' + (info.installed ? 'ok' : 'off');
    $('#hsTitle').textContent = !bundled ? t('hs_nobundle') : info.installed ? t('hs_on') : t('hs_off');
    $('#hsSub').textContent = !bundled ? t('hs_nobundle_s') : info.installed ? t('hs_on_s') : t('hs_off_s');
    $('#sysInstall').textContent = info.installed ? t('apply') : t('install_apply');
    $('#sysInstall').disabled = !bundled;

    const w = info.win;
    $('#cWin').textContent = w.build ? `Windows ${w.isWin11 ? '11' : '10'} ${w.displayVersion || ''}` : t('win_unknown');
    $('#cWin2').textContent = w.build ? `Build ${w.build}${w.ubr ? '.' + w.ubr : ''}` : '';
    $('#cEng').textContent = `ExplorerBlurMica ${info.engine.version}`;
    $('#cAdm').textContent = info.admin ? t('admin_yes') : t('admin_no');
    $('#cLoc').textContent = info.active?.dir || '—';

    const fw = $('#foreignWarn');
    fw.hidden = !(info.foreign && info.foreign.length);
    if (!fw.hidden) fw.innerHTML = `${t('foreign')}<div class="mono" style="margin-top:6px">${info.foreign.map(esc).join('<br>')}</div>`;

    $('#compat').innerHTML = window.IBRA_EFFECTS.map((e) => {
      const warn = effectWarning(e.v);
      const cls = !warn ? 'y' : (e.v === 0 ? 'm' : 'n');
      return `<div class="cp ${cls}"><b>${lang === 'ar' ? e.ar : e.en}</b>${warn || (lang === 'ar' ? '✓ يشتغل على جهازك' : '✓ Works on your PC')}</div>`;
    }).join('');
    $('#aboutVer').textContent = `v${info.appVersion} · Engine ${info.engine.version}`;
  }

  // ───────────────────────── language
  function applyLang() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    $('#langBtn').textContent = lang === 'ar' ? 'EN' : 'ع';
    renderChips(); renderGrid(); renderPreviewHead(); syncEditor(); bindEditor(); renderSystem(); renderBgRow();
  }

  // ───────────────────────── boot
  async function boot() {
    if (new URLSearchParams(location.search).get('glass') === '1') document.body.classList.add('glass');
    const s = await api.storeGet();
    store = s.ok ? s.data : { lang: 'ar', favorites: [], custom: [], lastThemeId: 'ibra-gold', previewBg: 'aurora', previewMode: 'dark' };
    store.favorites ||= []; store.custom ||= [];
    lang = store.lang || 'ar';
    mode = store.previewMode || 'dark';
    customBg = store.customBg || null;
    if (store.previewBg === 'custom' && !customBg) store.previewBg = 'aurora';

    selected = allThemes().find((x) => x.id === store.lastThemeId) || window.IBRA_THEMES[0];
    work = cfgOf(selected);

    // nav
    $$('.navb').forEach((b) => b.onclick = () => {
      $$('.navb').forEach((x) => x.classList.toggle('active', x === b));
      $$('.page').forEach((p) => p.classList.toggle('active', p.id === 'page-' + b.dataset.page));
      if (b.dataset.page === 'editor') paintAll();
    });
    $('#langBtn').onclick = () => { lang = lang === 'ar' ? 'en' : 'ar'; save({ lang }); applyLang(); };
    $('#wMin').onclick = api.win.min; $('#wMax').onclick = api.win.max; $('#wClose').onclick = api.win.close;
    $$('[data-mode]').forEach((b) => b.onclick = () => setMode(b.dataset.mode));
    $('#search').oninput = (e) => { query = e.target.value.trim(); renderGrid(); };
    $('#randomBtn').onclick = () => { const l = filtered(); if (l.length) select(l[Math.floor(Math.random() * l.length)]); };
    $('#applyBtn').onclick = doApply; $('#applyBtn2').onclick = doApply; $('#sysInstall').onclick = doApply;
    $('#favBtn').onclick = () => selected && toggleFav(selected.id);
    $('#editBtn').onclick = () => $('.navb[data-page="editor"]').click();
    $('#saveMine').onclick = saveMine;
    $('#sysRestart').onclick = doRestart;
    $('#sysUninstall').onclick = doUninstall;
    $('#openFolder').onclick = () => api.openEngineFolder();
    $$('[data-url]').forEach((b) => b.onclick = () => api.openUrl(b.dataset.url));
    $('#exportBtn').onclick = async () => {
      const list = store.custom.length ? store.custom : [{ id: 'mine-export', cat: 'mine', ar: t('draft'), en: t('draft'), ...clone(work) }];
      const r = await api.exportThemes(list);
      if (r.ok && r.data) toast(t('exported'), 'ok'); else if (!r.ok) toast(t('err') + r.error, 'err');
    };
    $('#importBtn').onclick = async () => {
      const r = await api.importThemes();
      if (!r.ok) { toast(t('err') + r.error, 'err'); return; }
      if (!r.data || !r.data.length) return;
      const clean = r.data.filter((x) => x && Array.isArray(x.light) && Array.isArray(x.dark)).map((x, i) => ({
        id: 'mine-' + Date.now() + '-' + i, cat: 'mine', ar: String(x.ar || x.en || 'Imported'), en: String(x.en || x.ar || 'Imported'),
        effect: Math.max(0, Math.min(4, Number(x.effect) || 0)), light: x.light.slice(0, 4).map(Number), dark: x.dark.slice(0, 4).map(Number),
        clearAddress: !!x.clearAddress, clearBarBg: !!x.clearBarBg, clearWinUIBg: !!x.clearWinUIBg, showLine: !!x.showLine
      }));
      save({ custom: [...store.custom, ...clean] });
      cat = 'mine'; renderChips(); renderGrid();
      if (clean[0]) select(clean[0]);
      toast(`${t('imported')} (${clean.length})`, 'ok');
    };
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $('#modal').hidden = true; });

    applyLang();
    setMode(mode);
    paintAll();
    refreshInfo();
    const pg = location.hash.slice(1); if (pg) $(`.navb[data-page="${pg}"]`)?.click();
  }
  boot();
})();
