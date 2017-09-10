import fetch from 'isomorphic-fetch';

self.requestFileSystem = self.webkitRequestFileSystem ||
  self.requestFileSystem;

const reqFileSystem = (size) => new Promise((resolve, reject) => {
  requestFileSystem(TEMPORARY, size, (fs) => {
    resolve(fs);
  }, (e) => {
    reject(e)
  })
});
const createFileEntry = (fs, data) => new Promise((resolve, reject) => {
    fs.root.getFile(data.fileName, {create: true}, (fileEntry) => {
      resolve(fileEntry);
    }, (e) => {
      reject(e)
    })
});
const createWriter = (fileEntry, data) => new Promise((resolve, reject) => {
  fileEntry.createWriter(fileWriter => {
    fileWriter.onwriteend = () => {
      resolve(fileEntry)
    };
    fileWriter.onerror = (e) => reject(e);
    const blob = new Blob([new Uint8Array(data)]);
    fileWriter.write(blob);
  },(e) => {
    reject(e);
  })
});
let isBusy = false;
let queue = [];
onmessage = function(e) {
  const data = e.data;
  if (!data.fileName || !data.url ) {
    return;
  }
  if (!isBusy) {
    isBusy = true;
    let blobData;
    fetch(data.url, {
      method: 'GET',
    })
      .then(response => response.arrayBuffer())
      .then(resp => {
        blobData = resp
      })
      .then(() => reqFileSystem(1024 * 1024 * 1000))
      .then(fs => createFileEntry(fs, data))
      .then(fileEntry => createWriter(fileEntry, blobData))
      .then(fileEntry => {
        postMessage(fileEntry.toURL());
        isBusy = false;
        if (queue.length) {
          onmessage(queue[0]);
          queue = queue.splice(1, queue.length - 1);
        }
      });
  } else {
    queue.push(e);
  }
};
