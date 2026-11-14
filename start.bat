@echo off
setlocal
cd /d "%~dp0"

where python >nul 2>nul
if errorlevel 1 (
  echo Python was not found.
  echo Install Python from https://www.python.org/ or run: npx serve .
  pause
  exit /b 1
)

echo Starting Web Dev: Zero to Grandmaster on http://localhost:8080
start "Web Dev Server" python -m http.server 8080
timeout /t 2 >nul
start "" http://localhost:8080
echo.
echo Keep the server window open while you learn.
echo Close it when you are done.
endlocal