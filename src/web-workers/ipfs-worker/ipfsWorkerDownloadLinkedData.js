 /* eslint-disable */
 import IPFSHttpClient from 'ipfs-http-client'
 
onmessage = function(e) {
    console.log("Downloading...");

    const ipfs = IPFSHttpClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});
    (async (ipfs)=>{
        let dts
        let next = ""
        do {
            console.log(`Downloading: ${e.data.path}`)
            const res = await ipfs.get(`/ipfs/${e.data.path}`)
            const content = await res.next()
            let dts = await content.value.content.next()
            console.log(new TextDecoder().decode(dt.value))
            if (!dts) {
                dts = dt.value;
            }
            else {
                dts = constructAndDecryptFile(dts, dt.value);
            }
        } while (next != "")

        return dts
    })(ipfs).then(res=>{
        postMessage(res);
    });
}

function constructFile(chunk1, chunk2) {
    var tmp = new Uint8Array(chunk1.length + chunk2.length);
    tmp.set(chunk1);
    tmp.set(chunk2, chunk1.length);
    return tmp;
} 