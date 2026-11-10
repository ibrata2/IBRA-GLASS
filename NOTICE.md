# Third-party notice

IBRA GLASS bundles the following component **unmodified**:

| Component | Author | License | Source |
|---|---|---|---|
| ExplorerBlurMica (`ExplorerBlurMica.dll`) | Maplespe | LGPL-3.0 (with GPL-3.0 text) | https://github.com/Maplespe/ExplorerBlurMica |

- The DLL is downloaded at build time from the official GitHub release (see `scripts/fetch-engine.ps1`); its SHA-256 and source URL are recorded in `engine/ENGINE_VERSION.txt` inside the installed app.
- The engine's license texts are shipped next to it as `ENGINE-LICENSE.txt` and `ENGINE-COPYING.LESSER.txt`.
- IBRA GLASS does not rename, patch, repackage under another CLSID, or otherwise alter the engine. It only writes the engine's documented `config.ini` and registers/unregisters the DLL with `regsvr32`, exactly as the engine's own `register.cmd` / `uninstall.cmd` do.
- You may replace the bundled DLL with any other build of ExplorerBlurMica (as permitted by the LGPL): replace `resources\engine\ExplorerBlurMica.dll` inside the IBRA GLASS installation folder, then press **Install & apply** in the app — it detects the different binary and re-deploys it.

All credit for the Explorer glass effect belongs to Maplespe.
