const workerUpload = new Worker(
  './ipfsWorker',
  { type: 'module', name: 'ipfs-upload-worker' }
);
const workerDownload = new Worker(
  './ipfsWorkerDownloadChunked',
  { type: 'module', name: 'ipfs-download-worker' }
);
const workerDownloadLinked = new Worker(
  './ipfsWorkerDownloadLinkedData',
  { type: 'module', name: 'ipfs-download-worker-linked' }
);

export default { workerUpload, workerDownload, workerDownloadLinked };
