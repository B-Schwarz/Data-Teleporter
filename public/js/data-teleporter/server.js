import {createNewPeer} from "./peer.js";

let p = await createNewPeer("");

p.on('open', (id) => {
    console.log(id)
})

p.on('connection', (conn) => {
    conn.on('data', (data) => {
        console.log(data)
    })
})
