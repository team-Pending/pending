const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const { uploadFile, getFileStream } = require('../s3');

const app = express();

app.get('/images/:key', (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});
// creates a get function that reads the information in the db.json file and sends it back
app.get('/api/notes', (req, res) => {
  // need to pull a
});

app.post('/image', upload.single('image'), async function (req, res) {
  const file = req.file;
  console.log(file);
  const result = await uploadFile(file);
  await unlinkFile(file.path);
  console.log(result);
  const description = req.body.description;
  res.send({ imagePath: `/images/${result.key}` });
});

// Add notes to the db.json file and sends back the information.
app.post('/api/notes', (req, res) => {});

// creates a method to delete previously made notes based on their unique id.
app.delete('/api/notes/:id', (req, res) => {});

module.exports = app;
