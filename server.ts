import * as net from 'net'

const server = net.createServer((socket) => {
    console.log("Clique")
    socket.end('goodbye\n');
}).on('error', (err) => {
    // Handle errors here.
    throw err;
});

server.listen(5000,() => {
    console.log('opened server on', server.address());
});