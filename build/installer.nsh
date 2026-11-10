; IBRA GLASS — NSIS hooks
; On uninstall: unregister every deployed copy of the engine, restart Explorer,
; then remove the engine folder (files still held by Explorer are removed at next reboot).

!macro customUnInstall
  ; skip during an update (the new version re-registers itself)
  ${ifNot} ${isUpdated}
    ReadEnvStr $4 PROGRAMDATA
    StrCmp $4 "" 0 +2
      StrCpy $4 "C:\ProgramData"
    StrCpy $0 "$4\IBRA GLASS\engine"
    ${if} ${FileExists} "$0\*.*"
      FindFirst $1 $2 "$0\*"
      ibraLoop:
        StrCmp $2 "" ibraDone
        StrCmp $2 "." ibraNext
        StrCmp $2 ".." ibraNext
        ${if} ${FileExists} "$0\$2\ExplorerBlurMica.dll"
          nsExec::Exec '"$SYSDIR\regsvr32.exe" /s /u "$0\$2\ExplorerBlurMica.dll"'
          Pop $3
        ${endif}
      ibraNext:
        FindNext $1 $2
        Goto ibraLoop
      ibraDone:
      FindClose $1
      ; restart Explorer so the DLL is released
      nsExec::Exec 'taskkill /f /im explorer.exe'
      Pop $3
      Sleep 1500
      nsExec::Exec 'cmd /c tasklist /fi "imagename eq explorer.exe" | find /i "explorer.exe" || start "" explorer.exe'
      Pop $3
      Sleep 800
      RMDir /r /REBOOTOK "$4\IBRA GLASS"
    ${endif}
  ${endif}
!macroend
