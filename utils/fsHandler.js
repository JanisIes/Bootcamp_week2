import fs from 'fs';

const createFolderIfNotExists = path =>
  new Promise((resolve, reject) => {
    fs.mkdir(path, err => {
      if (err) {
        if (err.code === 'EEXIST') {
          resolve();
        } else {
          reject(err);
        }
      } else {
        resolve();
      }
    });
  });

export { createFolderIfNotExists };
