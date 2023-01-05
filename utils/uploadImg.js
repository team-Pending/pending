const {uploadFile} = require('../controllers/s3');
const fs = require('fs');
const util = require('util');

const unlinkFile = util.promisify(fs.unlink);

const uploadImage = async(file) => {
    const result = await uploadFile(file);
    await unlinkFile(file.path);
    return result;
}

module.exports=uploadImage