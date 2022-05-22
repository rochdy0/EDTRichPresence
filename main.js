const { app } = require('electron')
const AutoLaunch = require("auto-launch");
const { autoUpdater } = require('electron-update')


let autoLaunch = new AutoLaunch({
    name: 'richPresence',
    path: process.execPath,
    isHidden: true
  });
  autoLaunch.isEnabled().then((isEnabled) => {
    if (!isEnabled) autoLaunch.enable();
  });


  app.on('ready', () => {
    require('./presence.js').main()
    autoUpdater.checkForUpdatesAndNotify()
});

autoUpdater.on('update-available', () => {
    console.log('Une nouvelle version est disponible')
})

autoUpdater.on('update-downloaded', () => {
    console.log('Nouvelle version téléchargée')
    autoUpdater.quitAndInstall()
})