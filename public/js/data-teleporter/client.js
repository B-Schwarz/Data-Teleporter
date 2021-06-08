import {createNewPeer} from "./peer.js";

let p = await createNewPeer("");
const saveAs = window.saveAs;
let conn;

function connect() {
    const id = document.getElementById("id-text").value;
    const ul = document.getElementById('id-ul');
    conn = p.connect(id)

    console.log('lulu')
    conn.on('open', () => {
        // const d = document.getElementById('id-file').files[0];
        // conn.send(d)
    })
    conn.on('data', (data) => {
        if (data.file) {
            let f = new File([data.file], data.name, {type: data.type});
            saveAs(f, data.name)
        } else if (data.file_names) {
            ul.innerHTML = '';
            for (let f of data.file_names) {
                let li = document.createElement("li")
                li.appendChild(document.createTextNode(f))

                let btn = document.createElement("button")
                btn.setAttribute('onclick', `getFile('${f}')`)
                btn.appendChild(document.createTextNode('Download'))

                li.appendChild(btn);
                ul.appendChild(li);
            }
        }
    })
    conn.on('close', () => {
        document.getElementById('id-title').innerText = 'DISCONNECTED'
        ul.innerHTML = '';
    })
}

function getFile(name) {
    if (conn.open) {
        conn.send(name)
    }
}

window.connect = connect;
window.getFile = getFile;
