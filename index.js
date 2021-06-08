const express = require('express');
const {ExpressPeerServer} = require("peer");
const app = express();

const {v4: uuidv4} = require('uuid');

const port = 3000;
const host = "0.0.0.0";

const server = app.listen(port, host, () => {
    console.log(`The server is started: ${host}:${port}`);
})

const peerServer = ExpressPeerServer(server, {
    path: '/'
})

peerServer.on('connection', (client) => {
    console.log('Connected: ' + client.getId())
})

peerServer.on('disconnect', (client) => {
    console.log('Disconnected: ' + client.getId())
})

//
//  API
//
app.get('/api/uuid', (req, res) => {
    res.send({id: uuidv4()});
})

app.use('/api/peer', peerServer)

app.use(express.json());

app.use(express.static(__dirname + '/public'))
