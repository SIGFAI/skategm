// SkateGM (the-schwilliam, no root license): Skate 3's board physics, tricks and scoring inside Garry's Mod, run by a
// Rust reimplementation of the Skate 3 engine as a GMod binary module, fed with data converted on the player's PC from
// their own Skate 3 Xbox 360 copy (allowed since Pj's 2026-10-05 decision, library/QC.md section 2).
// No root license, so upstream fetch (PLATFORM-SPEC section 4, "Upstream fetch"): skategm_6.0.zip is downloaded by the
// app from the author's release as released, never rehosted. SIGFAI/skategm hosts only the recipe.
//
// The zip is the author's "Install by hand" package (README at the tag): its three root files go to
// garrysmod/lua/bin and its skategm/ folder to garrysmod/addons. The same zip is listed twice in one step:
//   - unpacked whole into {game}/garrysmod/lua/bin: the module, SDL2 and the controller db land where GMod loads
//     them; the rest (skategm/, exporter/, engine/, licenses, README) rides along, inert (no root can pick root-level
//     files without repacking);
//   - root "skategm" into {game}/garrysmod/addons/skategm, the add-on as the author's installer copies it.
// The Skate 3 conversion is not run by the app: the player runs it once (notes), output outside the game folder.
//   node library/skategm/build.mjs       (outputs: library/lib.mjs)
import { asset, card, dl, emit, pinned } from '../lib.mjs';

const UP = {
  repo: 'https://github.com/the-schwilliam/SkateGM', tag: '6.0', commit: 'e369716463d47cce9db80ec4f866bbd578d0c9bf',
  authors: ['the-schwilliam'],
  zip: { file: 'skategm_6.0.zip', sha256: '0be7c461077b17a5b54eddcc6ca1e767f3babb90fdeb92c4f50a9a534cd88f93' }, // = GitHub digest
  setup: 'SkateGM-Setup-6.0.exe',
};
const ID = 'skategm', VERSION = '6.0.0', NAME = 'SkateGM';
const TAGLINE = 'Skate 3 in Garry\'s Mod: Skate 3\'s board physics, flick-it tricks and scoring on any map, with friends, minigames, a park editor and a skating gamemode.';

const upUrl = `${UP.repo}/releases/download/${UP.tag}/${UP.zip.file}`;
const mod = asset(UP.zip.file, await pinned(upUrl, UP.zip.sha256), { zipped: true, upstream: upUrl });
const assets = [mod];

const make = (urls) => ({
  id: `sigf/${ID}`,
  version: VERSION,
  name: NAME,
  tagline: TAGLINE,
  kind: 'mashup',
  games: [
    { game: 'gmod', role: 'host', label: 'Garry\'s Mod', engine: 'Garry\'s Mod (Source, x86-64 branch) + binary module gmcl_skategm_win64 (Rust, SK8-ENGINE) + Lua add-on', apps: { steam: '4000' }, runtime: 'x86-64 beta branch only' },
    { game: 'skate3', role: 'guest', label: 'Skate 3 (Xbox 360)', engine: 'player\'s own Xbox 360 copy, converted on their PC (not installed into)' },
  ],
  requires: [
    { id: 'gmod-x86-64', page: 'https://wiki.facepunch.com/gmod/x86-64_branch', note: 'Steam > Garry\'s Mod > Properties > Betas > x86-64: the module is 64-bit only' },
    { id: 'skate3-xbox360', note: 'your own Skate 3 for Xbox 360: the disc image (.iso) or an extracted folder with default.xex; converted once on your PC, nothing from it is shipped' },
    { id: 'controller', note: 'skating is controller only (Xbox, PlayStation, Switch Pro, ...); Steam Input off for Garry\'s Mod' },
    { id: 'python', version: '3', page: 'https://www.python.org/downloads/windows/', note: 'for the one-time conversion with numpy and Pillow (pip install numpy Pillow); or use the author\'s SkateGM-Setup-6.0.exe instead', optional: true },
  ],
  install: [
    { game: 'gmod', strategy: 'game-dir-snapshot', files: [
      // Upstream file as released, twice: whole into lua/bin (module + SDL2 + controller db at its root), and its
      // skategm/ add-on folder into addons/skategm. contents lists every entry for both.
      { src: mod.name, dst: '{game}/garrysmod/lua/bin', unpack: true, contents: mod.contents, ...dl(mod, urls) },
      { src: mod.name, dst: '{game}/garrysmod/addons/skategm', root: 'skategm', unpack: true, contents: mod.contents, ...dl(mod, urls) },
    ] },
  ],
  launch: [{ game: 'gmod', args: [] }],
  files: assets.map(a => ({ name: a.name, ...dl(a, urls) })),
  source: {
    repo: UP.repo, license: 'No root license (upstream download)', upstream_license: null, fetch: 'upstream', tag: UP.tag, commit: UP.commit,
    hosted: `https://github.com/SIGFAI/${ID}`,
    parts: [
      { name: 'engine/ (Skate 3 engine reimplementation)', license: 'Apache-2.0', repo: 'https://github.com/chasmlol/2010-rust-rewrite-mashup' },
      { name: 'SK8-ENGINE converter tools', commit: 'cb7968930f14dad38457e98720d1a274e469eec2', repo: 'https://github.com/SK8-ENGINE/skate-3-rust-engine' },
      { name: 'SDL2 2.32.10', license: 'Zlib' },
    ],
  },
  media: {},
  built_by: { author: UP.authors[0], authors: [...UP.authors, 'SK8-ENGINE contributors', 'chasmlol', 'duckyinnit'], packaged_by: 'SIGF' },
  idea_by: UP.authors[0],
  built_at: '2026-10-05T00:00:00.000Z',
  ...card(UP.repo),
  notes: [
    'You need Garry\'s Mod on Steam switched to the x86-64 branch (Properties > Betas > x86-64), a controller, and your own copy of Skate 3 for the Xbox 360 (a disc image .iso you made from your disc, or an extracted folder holding default.xex). Windows only.',
    'Turn off Steam Input for Garry\'s Mod (Properties > Controller > Disable Steam Input): it fixes most controller problems.',
    'Once, before playing, convert your Skate 3 on your PC (nothing is downloaded and nothing from Skate 3 is shipped). Either: install Python 3, run "pip install numpy Pillow", then "python <Garry\'s Mod folder>\\garrysmod\\lua\\bin\\exporter\\convert.py --xex \"<your Skate 3 .iso or default.xex>\" --out C:/skategm" (SkateGM reads C:/skategm/assets; another folder works with skategm_data "<folder>/assets" in the console). Or: run the author\'s SkateGM-Setup-6.0.exe from the release page and press Install; it converts into %LOCALAPPDATA%\\SkateGM\\data.',
    'The converted data stays outside the game folder and Restore does not delete it (C:/skategm, or %LOCALAPPDATA%\\SkateGM\\data plus garrysmod\\data\\skategm\\datapath.txt with the author\'s setup). Delete it yourself if you want it gone.',
    'The app installs the add-on into garrysmod\\addons\\skategm and the engine module, SDL2 and the controller database into garrysmod\\lua\\bin (the rest of the author\'s zip, including the converter, sits beside them, unused by the game); Restore removes them.',
    'Play: pick the SkateGM gamemode, or in any other gamemode type "bind j skategm_toggle" in the console once and press J. The first start takes a while to load. Hold LB for the extras (markers, minigames, settings, park editor, replays).',
    'Multiplayer is Garry\'s Mod\'s own: every skater needs the mod and their own converted Skate 3; a dedicated server needs only the skategm add-on folder. Some antivirus tools flag the engine module because it is a native DLL in the game folder (the author\'s issue #1: a false positive).',
    'Beta with open bugs (controller not detected after a crash, custom player models jitter, no option to turn off the airtime limit): report bugs to the author on the upstream issue tracker.',
  ],
});

// No app fixture: it would commit the author's unlicensed zip into our repo.
emit({ slug: ID, version: VERSION, assets, fixtureAssets: null, make });
