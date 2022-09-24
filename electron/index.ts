import Electron from './Electron';
import Socket from './Socket';

const app = new Electron;

app.on('ready', () => {
  app.createWindow();
})

app.onEvent('startServer', (e) => {
  const socket = new Socket.Server();
  socket.listen();
  e.sender.send("startServer");
});

app.onEvent('joinServer', (e, ip) => {
  const socket = new Socket.Client();
  socket.emit("start");
  socket.on('data', (data) => {
    console.log(data.toString());
  });
  socket.on('end', () => {
    console.log('disconnected from server');
  });
});

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
