export async function createNewPeer(id) {

    let peerID;

    if (String(id) && id.length > 0) {
        peerID = id;
    } else {
        let temp = await fetch('/api/uuid').then((d) => {
            return d.json()
        })
        peerID = temp.id
    }

    let Peer = window.Peer;

    let _port = 80;

    if (window.location.port) {
        _port = window.location.port
    } else if (window.location.protocol === 'https:') {
        _port = 443
    }

    let p = new Peer(peerID, {
        host: window.location.hostname,
        port: _port,
        path: '/api/peer/'
    });

    return p;
}
