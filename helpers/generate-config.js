const fs = require('fs');

const obj = {};
obj.version = `${Math.random()}`;

obj.cache = {
  maxAge: 0,
};

obj.hubConnectionPath = '';
obj.apiBaseUrl = 'https://api.dev';

fs.writeFile(
  `./config.js`,
  `var VHConfig = ${JSON.stringify(obj)}; module.exports = VHConfig`,
  function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  },
);
