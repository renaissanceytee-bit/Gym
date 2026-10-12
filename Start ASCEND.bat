@echo off
setlocal
cd /d "%~dp0"
title ASCEND Expo Preview

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found.
  echo Install the Node.js LTS version from https://nodejs.org, then reopen this launcher.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm was not found. Reinstall Node.js LTS with npm included.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Installing ASCEND dependencies. This may take a few minutes...
  call npm install
  if errorlevel 1 (
    echo Dependency installation failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
)

echo Starting ASCEND. Keep this window open while using Expo Go.
call npm start
if errorlevel 1 (
  echo.
  echo Expo stopped with an error. Copy the error text and share it for help.
  pause
)
