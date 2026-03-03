# Cria atalho na Área de Trabalho para abrir Congnittusai no Cursor
$Desktop = [Environment]::GetFolderPath("Desktop")
$ShortcutPath = Join-Path $Desktop "Congnittusai - Cursor.lnk"
$ProjectPath = "C:\Users\Crypto\congnittusai"

# Cursor.exe (instalação padrão)
$CursorExe = "$env:LOCALAPPDATA\Programs\cursor\Cursor.exe"
if (-not (Test-Path $CursorExe)) {
    $CursorExe = "cursor"
}

$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = $CursorExe
$Shortcut.Arguments = "`"$ProjectPath`""
$Shortcut.WorkingDirectory = $ProjectPath
$Shortcut.Description = "Abrir projeto Congnittusai (music-publish-squad) no Cursor"
$Shortcut.Save()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($WshShell) | Out-Null

Write-Host "Atalho criado: $ShortcutPath" -ForegroundColor Green
