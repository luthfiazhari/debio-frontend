import ipfsWorker from "@/web-workers/ipfs-worker"
import cryptWorker from "@/web-workers/crypt-worker"
import store from "@/store/index"

export function encrypt({ 
  text, 
  fileType, 
  fileName, 
  publicKey, 
  secretKey 
}) {
  return new Promise((resolve, reject) => {
    try {
      const pair = { 
        secretKey: secretKey,
        publicKey: publicKey // Customer's box publicKey
      }

      let chunksAmount
      const arrChunks = []
      
      cryptWorker.workerEncrypt.postMessage({ pair, text }) // Access this object in e.data in worker
      cryptWorker.workerEncrypt.onmessage = event => {
        // The first returned data is the chunksAmount
        if(event.data.chunksAmount) {
          chunksAmount = event.data.chunksAmount
          return
        }

        arrChunks.push(event.data)
        if (arrChunks.length == chunksAmount ) {
          resolve({
            fileName: fileName,
            chunks: arrChunks,
            fileType: fileType
          })
        }
      }
    } catch (err) {
      reject(new Error(err.message))
    }
  })
}

export function upload({ 
  fileChunk, 
  fileName, 
  fileType, 
  chunkSize = 10 * 1024 * 1024 
}) {
  let offset = 0
  const blob = new Blob([ fileChunk ], { type: fileType })

  return new Promise((resolve, reject) => {
    try {
      const fileSize = blob.size
      do {
          let chunk = blob.slice(offset, chunkSize + offset);
          ipfsWorker.workerUpload.postMessage({
          seed: chunk.seed, file: blob
          })
          offset += chunkSize
      } while((chunkSize + offset) < fileSize)
      
      let uploadSize = 0
      const uploadedResultChunks = []
      ipfsWorker.workerUpload.onmessage = async event => {
        uploadedResultChunks.push(event.data)
        uploadSize += event.data.data.size
        
        if (uploadSize >= fileSize) {
          resolve({
            fileName: fileName,
            fileType: fileType,
            ipfsPath: uploadedResultChunks
          })
        }
      }
    } catch (err) {
      reject(new Error(err.message))
    }
  })
}

export async function downloadChunkAndDecrypt({
  path, 
  fileName, 
  type,
  secretKey, 
  publicKey, 
}) {
  const channel = new MessageChannel();
  channel.port1.onmessage = ipfsWorker.workerDownload;
  const pair = {
    secretKey,
    publicKey,
  };

  const typeFile = type;
  ipfsWorker.workerDownload.postMessage({ path, pair, typeFile }, [channel.port2]);
  ipfsWorker.workerDownload.onmessage = (event) => {
    store.state.auth.loadingData = {
      loading: true,
      loadingText: "Downloading File",
    };
    if (type == "application/pdf") {
      downloadPDF(event.data, fileName);
    } else {
      download(event.data, fileName);
    }
  };
}

export async function downloadLinkedFromIPFS(path, secretKey, publicKey, fileName, type) {
  const channel = new MessageChannel();
  channel.port1.onmessage = ipfsWorker.workerDownloadLinked;
  const pair = {
    secretKey,
    publicKey,
  };

  const typeFile = type;
  ipfsWorker.workerDownloadLinked.postMessage({ path, pair, typeFile }, [channel.port2]);
  ipfsWorker.workerDownloadLinked.onmessage = (event) => {
    console.log(event.data)
  };
}

export async function downloadDecryptedFromIPFS(path, secretKey, publicKey, fileName, type) {
  store.state.auth.loadingData = {
    loading: true,
    loadingText: "Decrypt File",
  };
  const channel = new MessageChannel();
  channel.port1.onmessage = ipfsWorker.workerDownload;
  const pair = {
    secretKey,
    publicKey,
  };

  const typeFile = type;
  ipfsWorker.workerDownload.postMessage({ path, pair, typeFile }, [channel.port2]);
  ipfsWorker.workerDownload.onmessage = (event) => {
    store.state.auth.loadingData = {
      loading: true,
      loadingText: "Downloading File",
    };
    if (type == "application/pdf") {
      downloadPDF(event.data, fileName);
    } else {
      download(event.data, fileName);
    }
  };
}

export async function download(data, fileName) {
  const blob = new Blob([data], { type: "text/plain" });
  const e = document.createEvent("MouseEvents");
  const a = document.createElement("a");
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
  e.initEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  a.dispatchEvent(e);
  store.state.auth.loadingData = {
    loading: false,
    loadingText: "Downloaded File",
  };
}

export async function downloadPDF(data, fileName) {
  const blob = new Blob([data], { type: "application/pdf" });
  const e = document.createEvent("MouseEvents");
  const a = document.createElement("a");
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
  e.initEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  a.dispatchEvent(e);
  store.state.auth.loadingData = {
    loading: false,
    loadingText: "Downloaded File",
  };
}

export function arrayBufferToBase64(buffer){
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[ i ]);
  }
  return btoa(binary);
}