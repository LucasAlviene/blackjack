import Electron from './Electron';
import Socket from './Socket';

const app = new Electron;

app.on('ready', () => {
  app.createWindow();
})

app.onEvent('startServer', (e) => {
  const socket = Socket.Server.Start();
  e.sender.send("startServer");
});

app.onEvent('joinServer', (e, ip, name) => {
  const socket = Socket.Client.Start(ip);
  socket.emit("HANDSHAKE " + name);
});

app.onEvent('eventClient', (e, command) => {
  const socket = Socket.Client.current;
  if (socket) {
    socket.emit(command);
   // socket.end();
  }
})

app.on('activate', () => {
  if (Electron.current) app.createWindow();
});


app.on('window-all-closed', function () {
  // On OS X it is common for application and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.onEvent('CloseAndQuit', () => {
  app.quit();
})
