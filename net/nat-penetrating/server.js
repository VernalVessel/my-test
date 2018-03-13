const net = require('net');

let peerSet = {};

const server = net.createServer(socket => {
    for (let peer of Reflect.ownKeys(peerSet)) {
        peerSet[peer].pipe(socket);
        socket.pipe(peerSet[peer]);
    }
    peerSet[`${socket.remoteAddress}:${socket.remotePort}`] = socket;
})
.on('end', () => {
})
.on('error', (err) => {
    console.log(err);
})
.listen('52013');
