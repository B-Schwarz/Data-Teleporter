export async function createNewPeer(id) {

    let peerID;

    if (String(id) && id.length > 0) {
        peerID = id;
    } else {
        let temp = await fetch('/api/uuid').then((d) => {return d.json()})
        peerID = temp.id
    }

    let Peer = window.Peer;

    let h = window.location.host;
    h = h.substring(0, h.length - 5)

    console.log('Peer ID: ' + peerID)

    let p = new Peer(peerID, {
        host: h,
        port: 3000,
        path: '/api/peer/'
    });

    console.log(p.id)
    console.log(p.options)

    return p;
}
