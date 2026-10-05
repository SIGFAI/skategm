# SkateGM

Skate 3 in Garry's Mod: Skate 3's board physics, flick-it tricks and scoring on any map, with friends, minigames, a park editor and a skating gamemode.

**SkateGM is made by [the-schwilliam](https://github.com/the-schwilliam).** All credit for the mod goes to them.

- Original project: https://github.com/the-schwilliam/SkateGM
- Report bugs and ask questions there: https://github.com/the-schwilliam/SkateGM/issues
- Upstream release packaged here: [6.0](https://github.com/the-schwilliam/SkateGM/releases/tag/6.0) (commit [`e369716`](https://github.com/the-schwilliam/SkateGM/tree/e369716463d47cce9db80ec4f866bbd578d0c9bf))

> **Beta.** Nobody at SIGF has played this build yet. Back up your saves.
> Bugs in the mod itself go to the author's issue tracker above; problems with the one-click install go to this repository's issues.

## What you need

- **Garry's Mod** ([Steam](https://store.steampowered.com/app/4000/)): x86-64 beta branch only.
- **Skate 3 (Xbox 360)**.
- gmod-x86-64: Steam > Garry's Mod > Properties > Betas > x86-64: the module is 64-bit only (https://wiki.facepunch.com/gmod/x86-64_branch).
- skate3-xbox360: your own Skate 3 for Xbox 360: the disc image (.iso) or an extracted folder with default.xex; converted once on your PC, nothing from it is shipped.
- controller: skating is controller only (Xbox, PlayStation, Switch Pro, ...); Steam Input off for Garry's Mod.
- python 3: for the one-time conversion with numpy and Pillow (pip install numpy Pillow); or use the author's SkateGM-Setup-6.0.exe instead (https://www.python.org/downloads/windows/).
- Windows and the [SIGF app](https://sigf.ai). The app installs  for you.

## Install

In the SIGF app, open **SkateGM** in the catalog, press **Install**, then **Play**. **Restore** puts your game folders back exactly as they were.
The app follows `mashup.json` in this repository: every download is pinned by sha256. `skategm_6.0.zip` comes from the author's own release.

### Good to know

- You need Garry's Mod on Steam switched to the x86-64 branch (Properties > Betas > x86-64), a controller, and your own copy of Skate 3 for the Xbox 360 (a disc image .iso you made from your disc, or an extracted folder holding default.xex). Windows only.
- Turn off Steam Input for Garry's Mod (Properties > Controller > Disable Steam Input): it fixes most controller problems.
- Once, before playing, convert your Skate 3 on your PC (nothing is downloaded and nothing from Skate 3 is shipped). Either: install Python 3, run "pip install numpy Pillow", then "python <Garry's Mod folder>\garrysmod\lua\bin\exporter\convert.py --xex "<your Skate 3 .iso or default.xex>" --out C:/skategm" (SkateGM reads C:/skategm/assets; another folder works with skategm_data "<folder>/assets" in the console). Or: run the author's SkateGM-Setup-6.0.exe from the release page and press Install; it converts into %LOCALAPPDATA%\SkateGM\data.
- The converted data stays outside the game folder and Restore does not delete it (C:/skategm, or %LOCALAPPDATA%\SkateGM\data plus garrysmod\data\skategm\datapath.txt with the author's setup). Delete it yourself if you want it gone.
- The app installs the add-on into garrysmod\addons\skategm and the engine module, SDL2 and the controller database into garrysmod\lua\bin (the rest of the author's zip, including the converter, sits beside them, unused by the game); Restore removes them.
- Play: pick the SkateGM gamemode, or in any other gamemode type "bind j skategm_toggle" in the console once and press J. The first start takes a while to load. Hold LB for the extras (markers, minigames, settings, park editor, replays).
- Multiplayer is Garry's Mod's own: every skater needs the mod and their own converted Skate 3; a dedicated server needs only the skategm add-on folder. Some antivirus tools flag the engine module because it is a native DLL in the game folder (the author's issue #1: a false positive).
- Beta with open bugs (controller not detected after a crash, custom player models jitter, no option to turn off the airtime limit): report bugs to the author on the upstream issue tracker.

## What this repository holds

SkateGM has no root license (only its `engine/` folder is Apache-2.0), so SIGF may not rehost it. This repository holds **only SIGF's own files**, never the author's:

1. This README, `sigf/` (the script that built the recipe, for reference) and `mashup.json` (the SIGF app recipe).
2. Not here: `skategm_6.0.zip` (sha256 `0be7c461077b17a5b54eddcc6ca1e767f3babb90fdeb92c4f50a9a534cd88f93`). The app downloads it on the player's demand from the author's release, as released: https://github.com/the-schwilliam/SkateGM/releases/download/6.0/skategm_6.0.zip
3. The release `v6.0.0`, which has no assets: the recipe's only download is the author's file above.

The sha256 of every file inside the zips is in `mashup.json` (`contents`).

## Licenses

| Part | License | Where |
|---|---|---|
| SkateGM (`skategm_6.0.zip`, the author's release file) | no root license (`engine/` Apache-2.0, exporter vendor folders MIT). Not stored here; the app downloads it from the author's release | https://github.com/the-schwilliam/SkateGM |

## Why this repository exists

The SIGF app (https://sigf.ai) installs mods from recipes (`mashup.json`) whose downloads are pinned release files. This repository makes SkateGM installable in one click, credited to the-schwilliam. If you are the author and want anything changed or taken down, open an issue here.
