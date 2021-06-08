import {createNewPeer} from "./peer.js";

let p = await createNewPeer("");

function connect() {
    const id = document.getElementById("id-text").value;
    const ul = document.getElementById('id-ul');
    const conn = p.connect(id)

    console.log('lulu')
    conn.on('open', () => {
        // const d = document.getElementById('id-file').files[0];
        // conn.send(d)
    })
    conn.on('data', (data) => {
        ul.innerHTML = '';
        for (let f of data) {
            let li = document.createElement("li")
            li.appendChild(document.createTextNode(f))
            ul.appendChild(li);
        }
    })
    conn.on('close', () => {
        document.getElementById('id-title').innerText = 'DISCONNECTED'
        ul.innerHTML = '';
    })
}

window.connect = connect;
