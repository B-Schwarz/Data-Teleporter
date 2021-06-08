import {createNewPeer} from "./peer.js";
let p = await createNewPeer("");

async function a() {
    console.log('Kalla')

    const id = document.getElementById("id-text").value;
    let conn = p.connect(id)

    conn.on('open', () => {
        conn.send('Hello')
    })
}

console.log('Jello')
window.a = a;
