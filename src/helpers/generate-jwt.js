const jwt = require('jsonwebtoken');

const GenerateJWT = (id = '') => {
  return new Promise((resolve, reject) => {
    const payload ={uuid:id}
    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: '7 days' },
       (err, token) => {
        if (err) {
          console.log('ERROR', err);
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};
module.exports = GenerateJWT;
