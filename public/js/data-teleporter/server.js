let Peer = window.Peer;

let p = new Peer();

p.on('open', (id) => {
    console.log(id)
})
