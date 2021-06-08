import {createNewPeer} from "./peer.js";

let p = await createNewPeer("");

let files = document.getElementById('id-file').files
let file_names = []

function update_files() {
    files = document.getElementById('id-file').files

    file_names = []
    for (let i = 0; i < files.length; i++) {
        file_names.push(files.item(i).name)
    }
}

function sendFileList(conn) {
    const data = {file_names: file_names}
    conn.send(data)
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
        try {
            for (let i = 0; i < file_names.length; i++) {
                if (file_names[i] === String(data)) {
                    // const d = document.getElementById('id-file').files[0];
                    conn.send({file: files[i], name: files[i].name, type: files[i].type})
                }
            }
        } catch (_) {
        }
    })
    conn.on('close', () => {
        if (interval) {
            clearInterval(interval)
        }
    })
})

window.update_files = update_files;
