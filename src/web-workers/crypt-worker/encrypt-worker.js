/* eslint-disable */
import Kilt from '@kiltprotocol/sdk-js'

onmessage = function(e) {
  console.log("Encrypting...");

  (async () => {
    const fileBlob = new Blob([ e.data.text ], {type: 'text/plain'})
    const chunkSize = 5 * 1000 * 1024 // 5 MB chunk size
    const chunksAmount = Math.ceil(fileBlob.size / chunkSize)
    postMessage({chunksAmount})

    for (let i = 0; i < chunksAmount; i += 1) {
      const start = chunkSize * i
      const end = chunkSize * (i + 1)
      const chunk = fileBlob.slice(start, end, fileBlob.type)
      const chunkBuf = await chunk.arrayBuffer()

      const data = await Kilt.Utils.Crypto.encryptAsymmetric(new Uint8Array(chunkBuf), e.data.pair.publicKey, e.data.pair.secretKey)
      postMessage({ seed: i,  data })
    }
  })()
    .then(() => {
      console.log("Encrypted")
    })
    .catch(console.log)
}
