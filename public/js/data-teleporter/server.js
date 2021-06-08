import {createNewPeer} from "./peer.js";

let p = await createNewPeer("");
const saveAs = window.saveAs;

let files = document.getElementById('id-file').files

function update_files() {
    files = document.getElementById('id-file').files
}

function sendFileList(conn) {
    let f = []

    for (let i = 0; i < files.length; i++) {
        f.push(files.item(i).name)
    }

    conn.send(f)
}

p.on('open', (id) => {
    console.log(id)
})

p.on('connection', (conn) => {
    let interval;
    conn.on('open', () => {
        interval = setInterval(sendFileList, 200, conn)
    })
    conn.on('data', (data) => {
        // let f = new File([data], "Affe");
        // saveAs(f, "test.zip")
    })
    conn.on('close', () => {
        if (interval) {
            clearInterval(interval)
        }
    })
})

window.update_files = update_files;
