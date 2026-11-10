'use strict';
const { contextBridge, ipcRenderer } = require('electron');

const call = (ch, ...a) => ipcRenderer.invoke(ch, ...a);

contextBridge.exposeInMainWorld('ibra', {
  info: () => call('sys:info'),
  install: (cfg) => call('engine:install', cfg),
  apply: (cfg, restart) => call('engine:apply', cfg, restart),
  uninstall: (removeFiles) => call('engine:uninstall', removeFiles),
  restartExplorer: () => call('explorer:restart'),
  openEngineFolder: () => call('engine:openFolder'),
  iniPreview: (cfg) => call('ini:preview', cfg),
  storeGet: () => call('store:get'),
  storeSet: (d) => call('store:set', d),
  exportThemes: (t) => call('theme:export', t),
  importThemes: () => call('theme:import'),
  pickImage: () => call('preview:pickImage'),
  openUrl: (u) => call('open:url', u),
  win: {
    min: () => ipcRenderer.send('win:min'),
    max: () => ipcRenderer.send('win:max'),
    close: () => ipcRenderer.send('win:close'),
    onState: (cb) => ipcRenderer.on('win:state', (_e, s) => cb(s))
  }
});
