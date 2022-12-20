const { app, BrowserWindow } = require('electron');
const localShortcut  = require('electron-localshortcut');
const fs = require('fs');
const path = require('path');
const url = require('url');
const os = require('os');

// Load environment variables
// require('dotenv').config({
//   path: `${__dirname}/.env`
// })

let win;

function openDevTools() {
  if (!win.webContents.isDevToolsOpened()) {
    win.webContents.openDevTools({
      mode: 'detach'
    });
    win.focus();
  }
}

function createWindow() {
  win = new BrowserWindow({
    // horisontal size of the display in pixels
    width: 1024,
    // vertical size of the display in pixels
    height: 600,

    // Frame should be enabled for dev environment
    frame: true,

    // Disable DevTools for production
    webPreferences: {
      //devTools: process.env.ENVIRONMENT !== 'production'
    }
  });
  win.removeMenu();

  // Path when running electron executable
  let pathIndex = './index.html';

  if(fs.existsSync(path.join(__dirname, './dist/ultra-angular/index.html'))) {
    // Path when running electron in local folder
    pathIndex = './dist/ultra-angular/index.html';
  }

  win.loadURL(`file://${__dirname}/${pathIndex}`);

  // Register local shortcuts for toggling the devtools
  localShortcut.register(win, 'F12', openDevTools);
  localShortcut.register(win, 'CommandOrControl+Shift+I', openDevTools);

  win.on('closed', function() {
    win = null;
  });

  // win.webContents
  //   .executeJavaScript('localStorage.removeItem(\'token\');localStorage.removeItem(\'hostname\');', true)
  //   .then();

  // const name = os.hostname();
  // if (name) {
  //   win.webContents
  //     .executeJavaScript(`localStorage.setItem(\'hostname\', \'${name}\');`, true)
  //     .then();
  // }
}

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', function() {
    if (win) {
      if (win.isMinimized())
        win.restore();

      win.focus();
    }
  });

  app.on('ready', createWindow);

  app.on('activate', function() {
    if(win === null) {
      createWindow();
    }
  });
  
  // SSL/TSL: this is the self signed certificate support
  app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    // disable default behaviour (stop loading the page)
    event.preventDefault();
    // then say "it is all fine - true" to the callback
    callback(true);
  });
}
