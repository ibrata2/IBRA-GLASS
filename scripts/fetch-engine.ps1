# Downloads the official, unmodified ExplorerBlurMica engine release into ./engine
# Engine: https://github.com/Maplespe/ExplorerBlurMica  (LGPL-3.0, by Maplespe)
param([string]$Version = "2.1.0")
$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

$root   = Split-Path -Parent $PSScriptRoot
$out    = Join-Path $root "engine"
$tmp    = Join-Path ([IO.Path]::GetTempPath()) ("ebm-" + [guid]::NewGuid())
New-Item -ItemType Directory -Force -Path $tmp | Out-Null
if (Test-Path $out) { Remove-Item -Recurse -Force $out }
New-Item -ItemType Directory -Force -Path $out | Out-Null

$headers = @{ "User-Agent" = "IBRA-GLASS-build"; "Accept" = "application/vnd.github+json" }
if ($env:GH_TOKEN) { $headers["Authorization"] = "Bearer $($env:GH_TOKEN)" }

Write-Host "Fetching ExplorerBlurMica $Version release info…"
$rel = Invoke-RestMethod -Headers $headers -Uri "https://api.github.com/repos/Maplespe/ExplorerBlurMica/releases/tags/$Version"
$zips = @($rel.assets | Where-Object { $_.name -match '\.zip$' })
if ($zips.Count -eq 0) { throw "No .zip asset in release $Version" }
Write-Host ("Assets: " + (($rel.assets | ForEach-Object { $_.name }) -join ", "))
$asset = $zips | Where-Object { $_.name -match 'x64|amd64' } | Select-Object -First 1
if (-not $asset) { $asset = $zips | Where-Object { $_.name -notmatch 'arm|x86|32' } | Select-Object -First 1 }
if (-not $asset) { $asset = $zips[0] }
Write-Host "Using asset: $($asset.name)"

$zip = Join-Path $tmp $asset.name
Invoke-WebRequest -Headers @{ "User-Agent" = "IBRA-GLASS-build" } -Uri $asset.browser_download_url -OutFile $zip
Expand-Archive -Path $zip -DestinationPath (Join-Path $tmp "x") -Force

$dlls = @(Get-ChildItem -Recurse -Path (Join-Path $tmp "x") -Filter "ExplorerBlurMica.dll")
if ($dlls.Count -eq 0) { throw "ExplorerBlurMica.dll not found in $($asset.name)" }

function Get-Machine([string]$path) {
  $b = [IO.File]::ReadAllBytes($path)
  $pe = [BitConverter]::ToInt32($b, 0x3C)
  return [BitConverter]::ToUInt16($b, $pe + 4)
}
$dll = $dlls | Where-Object { (Get-Machine $_.FullName) -eq 0x8664 } | Select-Object -First 1
if (-not $dll) { throw "No x64 build of ExplorerBlurMica.dll found" }
Write-Host "Engine DLL: $($dll.FullName)"
$dir = $dll.DirectoryName

Copy-Item $dll.FullName (Join-Path $out "ExplorerBlurMica.dll")
foreach ($f in @("config.ini", "ReadMe.txt", "readme.txt")) {
  $p = Join-Path $dir $f
  if (Test-Path $p) { Copy-Item $p (Join-Path $out $f) -Force }
}

# License files of the engine (shipped alongside the binary as LGPL requires)
foreach ($lf in @("LICENSE", "COPYING.LESSER")) {
  Invoke-WebRequest -Headers @{ "User-Agent" = "IBRA-GLASS-build" } `
    -Uri "https://raw.githubusercontent.com/Maplespe/ExplorerBlurMica/$Version/$lf" `
    -OutFile (Join-Path $out ("ENGINE-" + $lf + ".txt"))
}

$sha = (Get-FileHash -Algorithm SHA256 (Join-Path $out "ExplorerBlurMica.dll")).Hash.ToLower()
@(
  $Version,
  "source: https://github.com/Maplespe/ExplorerBlurMica/releases/tag/$Version",
  "asset: $($asset.name)",
  "sha256: $sha",
  "ExplorerBlurMica by Maplespe - LGPL-3.0 - bundled unmodified by IBRA GLASS"
) | Set-Content -Encoding UTF8 (Join-Path $out "ENGINE_VERSION.txt")

Remove-Item -Recurse -Force $tmp
Write-Host "Engine ready in $out"
Get-ChildItem $out | Format-Table Name, Length
