/* IBRA GLASS — built-in styles
 * effect: 0 Blur | 1 Acrylic | 2 Mica | 3 Blur(Clear) | 4 MicaAlt
 * light/dark: [r,g,b,a] tint blended over the glass (a = 0..255)
 */
window.IBRA_CATEGORIES = [
  { id: 'all',     ar: 'الكل',        en: 'All' },
  { id: 'fav',     ar: 'المفضلة',     en: 'Favorites' },
  { id: 'lux',     ar: 'فخم',         en: 'Luxury' },
  { id: 'dark',    ar: 'داكن',        en: 'Dark' },
  { id: 'light',   ar: 'فاتح',        en: 'Light' },
  { id: 'color',   ar: 'ملوّن',       en: 'Colorful' },
  { id: 'nature',  ar: 'طبيعة',       en: 'Nature' },
  { id: 'neon',    ar: 'نيون',        en: 'Neon' },
  { id: 'clear',   ar: 'شفاف صافي',   en: 'Pure glass' },
  { id: 'mine',    ar: 'ستايلاتي',    en: 'My styles' }
];

const T = (id, cat, ar, en, effect, light, dark, f = {}) => ({
  id, cat, ar, en, effect, light, dark,
  clearAddress: f.clearAddress ?? true,
  clearBarBg:   f.clearBarBg   ?? true,
  clearWinUIBg: f.clearWinUIBg ?? true,
  showLine:     f.showLine     ?? false
});

window.IBRA_THEMES = [
  // ── فخم / Luxury
  T('ibra-gold',     'lux', 'ذهبي إبرا',        'IBRA Gold',        1, [212,175,55,70],  [40,30,8,150]),
  T('black-gold',    'lux', 'أسود وذهبي',       'Black & Gold',     1, [235,215,160,120],[12,10,4,185]),
  T('royal-purple',  'lux', 'بنفسجي ملكي',      'Royal Purple',     1, [190,160,230,110],[38,16,60,160]),
  T('champagne',     'lux', 'شمبانيا',          'Champagne',        1, [247,231,206,150],[70,58,40,150]),
  T('rose-gold',     'lux', 'روز جولد',         'Rose Gold',        1, [244,196,190,130],[70,36,34,155]),
  T('emerald-lux',   'lux', 'زمرد فاخر',        'Emerald Luxe',     1, [170,225,195,110],[6,48,32,165]),
  T('sapphire',      'lux', 'ياقوت أزرق',       'Sapphire',         1, [170,195,240,110],[10,22,60,165]),
  T('ruby',          'lux', 'ياقوت أحمر',       'Ruby',             1, [240,170,180,110],[60,8,18,165]),

  // ── داكن / Dark
  T('midnight',      'dark', 'منتصف الليل',     'Midnight',         1, [200,205,220,150],[8,10,20,170]),
  T('graphite',      'dark', 'غرافيت',          'Graphite',         1, [210,210,210,170],[28,28,30,175]),
  T('obsidian',      'dark', 'أوبسيديان',       'Obsidian',         1, [190,190,195,190],[0,0,0,200]),
  T('navy-night',    'dark', 'كحلي ليلي',       'Navy Night',       1, [190,205,235,140],[10,18,42,175]),
  T('smoke',         'dark', 'دخاني',           'Smoke',            1, [220,220,220,140],[20,20,20,120]),
  T('mica-dark',     'dark', 'مايكا داكن',      'Mica Dark',        2, [32,32,32,0],     [0,0,0,0]),
  T('mica-alt',      'dark', 'مايكا ألت',       'Mica Alt',         4, [0,0,0,0],        [0,0,0,0]),

  // ── فاتح / Light
  T('snow',          'light', 'ثلجي',           'Snow',             1, [255,255,255,200],[60,60,60,140]),
  T('pearl',         'light', 'لؤلؤي',          'Pearl',            1, [245,242,235,170],[50,48,44,150]),
  T('cloud',         'light', 'غيمة',           'Cloud',            1, [220,220,220,160],[0,0,0,120]),
  T('milk-glass',    'light', 'زجاج حليبي',     'Milk Glass',       1, [250,250,252,215],[40,40,44,170]),
  T('mica-light',    'light', 'مايكا فاتح',     'Mica Light',       2, [0,0,0,0],        [0,0,0,0]),

  // ── ملوّن / Colorful
  T('sky',           'color', 'سماوي',          'Sky',              1, [180,220,255,130],[10,40,70,150]),
  T('lavender',      'color', 'لافندر',         'Lavender',         1, [215,200,255,130],[40,28,70,150]),
  T('peach',         'color', 'خوخي',           'Peach',            1, [255,210,180,130],[70,40,22,150]),
  T('mint',          'color', 'نعناعي',         'Mint',             1, [190,245,220,130],[12,56,44,150]),
  T('sakura',        'color', 'ساكورا',         'Sakura',           1, [255,205,225,135],[66,24,44,150]),
  T('sunset',        'color', 'غروب',           'Sunset',           1, [255,190,140,120],[80,30,10,160]),
  T('ocean',         'color', 'محيط',           'Ocean',            1, [150,210,230,120],[4,40,56,160]),
  T('lemon',         'color', 'ليموني',         'Lemon',            1, [250,245,170,130],[56,52,8,150]),

  // ── طبيعة / Nature
  T('forest',        'nature', 'غابة',          'Forest',           1, [190,220,180,130],[14,36,16,165]),
  T('desert',        'nature', 'صحراء',         'Desert',           1, [235,210,170,140],[60,42,18,160]),
  T('tigris',        'nature', 'دجلة',          'Tigris',           1, [170,215,215,120],[8,44,48,160]),
  T('palm',          'nature', 'نخيل',          'Palm',             1, [210,225,170,130],[34,46,14,160]),
  T('coffee',        'nature', 'قهوة',          'Coffee',           1, [225,200,175,150],[44,26,14,175]),

  // ── نيون / Neon
  T('cyber',         'neon', 'سايبر',           'Cyber',            1, [120,240,255,90], [0,30,40,150]),
  T('magenta',       'neon', 'ماجنتا',          'Magenta',          1, [255,120,220,90], [50,0,40,155]),
  T('toxic',         'neon', 'أخضر نيون',       'Toxic Green',      1, [160,255,120,90], [10,40,0,155]),
  T('vapor',         'neon', 'فيبرويف',         'Vaporwave',        1, [255,150,230,80], [30,10,60,150]),
  T('electric',      'neon', 'أزرق كهربائي',    'Electric Blue',    1, [90,160,255,90],  [0,16,60,155]),

  // ── شفاف صافي / Pure glass
  T('crystal',       'clear', 'كريستال',        'Crystal',          3, [255,255,255,0],  [0,0,0,0]),
  T('crystal-tint',  'clear', 'كريستال خفيف',   'Soft Crystal',     1, [255,255,255,70], [0,0,0,60]),
  T('ghost',         'clear', 'شبح',            'Ghost',            1, [255,255,255,30], [0,0,0,30]),
  T('classic-blur',  'clear', 'ضبابي كلاسيك',   'Classic Blur',     0, [220,220,220,160],[0,0,0,120])
];

window.IBRA_EFFECTS = [
  { v: 0, ar: 'ضبابي (Blur)',               en: 'Blur',              note_ar: 'حتى ويندوز 11 22H2',  note_en: 'Up to Win11 22H2' },
  { v: 1, ar: 'أكريليك (Acrylic)',          en: 'Acrylic',           note_ar: 'ويندوز 10 و11',       note_en: 'Win10 & Win11' },
  { v: 2, ar: 'مايكا (Mica)',               en: 'Mica',              note_ar: 'ويندوز 11 فقط',       note_en: 'Win11 only' },
  { v: 3, ar: 'ضبابي صافي (Blur Clear)',    en: 'Blur (Clear)',      note_ar: 'ويندوز 10 و11',       note_en: 'Win10 & Win11' },
  { v: 4, ar: 'مايكا ألت (Mica Alt)',       en: 'Mica Alt',          note_ar: 'ويندوز 11 فقط',       note_en: 'Win11 only' }
];
