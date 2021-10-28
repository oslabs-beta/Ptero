const windowStateManager = require('electron-window-state');
const contextMenu = require('electron-context-menu');
const { app, BrowserWindow } = require('electron');
const serve = require('electron-serve');
const { fork } = require('child_process');

try {
	require('electron-reloader')(module);
} catch (e) {
	console.error(e);
}

const serveURL = serve({ directory: '.' });
const port = process.env.PORT || 3000;
// = 3000;
const dev = !app.isPackaged;
let mainWindow;

function createWindow() {
	let windowState = windowStateManager({
		defaultWidth: 1920,
		defaultHeight: 1080
	});

	const mainWindow = new BrowserWindow({
		backgroundColor: 'whitesmoke',
		titleBarStyle: 'hidden',
		autoHideMenuBar: false, //it was true
		trafficLightPosition: {
			x: 17,
			y: 32
		},
		minHeight: 450,
		minWidth: 500,
		webPreferences: {
			enableRemoteModule: true,
			contextIsolation: true, // it was true
			nodeIntegration: true,
			spellcheck: false,
			devTools: true
		},
		x: windowState.x,
		y: windowState.y,
		width: windowState.width,
		height: windowState.height
	});

	windowState.manage(mainWindow);

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		mainWindow.focus();
	});

	mainWindow.on('close', () => {
		windowState.saveState(mainWindow);
	});

	return mainWindow;
}

contextMenu({
	showLookUpSelection: false,
	showSearchWithGoogle: true,
	showCopyImage: false,
	prepend: (defaultActions, params, browserWindow) => [
		{
			label: 'Make App 💻'
		}
	]
});

function loadVite(port) {
	mainWindow.loadURL(`http://localhost:${port}`).catch((e) => {
		console.log('Error loading URL, retrying', e);
		setTimeout(() => {
			loadVite(port);
		}, 200);
	});
}

function createMainWindow() {
	mainWindow = createWindow();
	mainWindow.once('close', () => {
		mainWindow = null;
	});

	if (dev) loadVite(port);
	else {
		serveURL(mainWindow);
		ssr = fork(`${__dirname}/index.js`);
	}
}

app.on('ready', createMainWindow);
app.on('activate', () => {
	if (!mainWindow) {
		createMainWindow();
	}
});
app.on('ready', function () {
	mainWindow = new BrowserWindow({ width: 800, height: 600 });
	mainWindow.webContents.openDevTools();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
