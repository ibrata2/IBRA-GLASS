// Quick checks run in CI before building
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { buildIni, parseIni } = require('../src/ini');

// config.ini round-trip
const cfg = { effect: 1, light: [212, 175, 55, 70], dark: [40, 30, 8, 150], clearAddress: true, clearBarBg: false, clearWinUIBg: true, showLine: false };
const back = parseIni(buildIni(cfg));
assert.strictEqual(back.effect, 1);
assert.deepStrictEqual(back.light, cfg.light);
assert.deepStrictEqual(back.dark, cfg.dark);
for (const k of ['clearAddress', 'clearBarBg', 'clearWinUIBg', 'showLine']) assert.strictEqual(back[k], cfg[k], k);
// clamping
const c = parseIni(buildIni({ effect: 9, light: [300, -5, 1.6, 999], dark: [0, 0, 0, 0] }));
assert.strictEqual(c.effect, 4);
assert.deepStrictEqual(c.light, [255, 0, 2, 255]);
// ini must be pure ASCII (engine reads it with the Win32 profile API)
assert.ok(/^[\x00-\x7F]*$/.test(buildIni(cfg)), 'ini must be ASCII');

// themes
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'src', 'renderer', 'themes.js'), 'utf8'), ctx);
const { IBRA_THEMES, IBRA_CATEGORIES } = ctx.window;
const ids = new Set();
const cats = new Set(IBRA_CATEGORIES.map((x) => x.id));
for (const t of IBRA_THEMES) {
  assert.ok(!ids.has(t.id), 'duplicate id ' + t.id); ids.add(t.id);
  assert.ok(cats.has(t.cat), 'bad category ' + t.cat);
  assert.ok(t.ar && t.en, 'names ' + t.id);
  assert.ok([0, 1, 2, 3, 4].includes(t.effect), 'effect ' + t.id);
  for (const k of ['light', 'dark']) {
    assert.strictEqual(t[k].length, 4, k + ' ' + t.id);
    t[k].forEach((v) => assert.ok(Number.isInteger(v) && v >= 0 && v <= 255, `${t.id}.${k}=${v}`));
  }
}
console.log(`OK — ini round-trip, ${IBRA_THEMES.length} styles in ${cats.size} categories`);
