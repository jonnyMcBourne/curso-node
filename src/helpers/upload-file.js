const  { v4 : uuidv4 } = require('uuid');
const path = require('path');

const uploadFile = (archivo, validExtensions = ['png', 'jpg', 'gif'],directoryToStoreFile='') => {
  return new Promise((resolve, reject) => {
    const splittedName = archivo.name.split('.');
    const extension = splittedName[splittedName.length - 1];
    if (!validExtensions.includes(extension)) {
      return reject({
        error:'error',
        msg:`'${extension}' is not a valid extension, please upload one of this extensions: ${validExtensions}`,
      });
    }
    const tempName = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname, `../uploads/${directoryToStoreFile}`, tempName);
    archivo.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve({ msg: 'File uploaded!', name:tempName });
    });
  });
};
module.exports = { uploadFile };
