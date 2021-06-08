const express = require('express');
const app = express();

const port = 3000;
const host = "0.0.0.0";

app.use(express.json());

app.use(express.static(__dirname + '/public'))

app.listen(port, host, () => {
    console.log(`The server is started: ${host}:${port}`);
})
