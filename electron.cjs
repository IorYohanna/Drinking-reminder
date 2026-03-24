const { app, BrowserWindow, ipcMain } = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: "Drinking Reminder",
    width: 510,
    height: 864,
    frame: false,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: __dirname + "/preload.js",
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL("http://localhost:5173");
}

ipcMain.on("close-app", () => {
  if (mainWindow) mainWindow.close();
});

app.whenReady().then(() => {
  createWindow();
  setInterval(detectSiteUsage, 5000);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
