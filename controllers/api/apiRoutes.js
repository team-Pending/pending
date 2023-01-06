const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
// const { uploadFile, getFileStream } = require('../s3');
const uploadImage = require('../../utils/uploadImg');
const Note = require('../../models/Note');

const app = express();

app.get('/images/:key', (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});
// creates a get function that reads the information in the db.json file and sends it back
app.get('/notes', async (req, res) => {
  console.log('you have entered the twilight zone');
  try {
    const allNotes = await Note.findAll({
      attributes: ['key', 'title', 'description', 'date', 'user_id'],
      where: { id: true },
      order: '"date" DESC',
    });
    console.log(allNotes);
    const notes = allNotes.map((note) => note.get({ plain: true }));
    console.log(notes);
    res.render('note', { notes, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/image', upload.single('image'), async function (req, res) {
  const result = await uploadImage(req.file);
  res.send({ imagePath: `/images/${result.key}` });
  const userData = await Note.create({
    user_id: req.session.user_id,
    title: req.body.title,
    description: req.body.description,
    key: result.key,
  });
});

// creates a method to delete previously made notes based on their unique id.
app.delete('/api/notes/:id', (req, res) => {
  app.delete('/api/notes/:id', async (req, res) => {
    res.status(200);
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
      deletePhoto(req);

      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }

      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = app;

  const deletePhoto = async (req) => {
    const key = req.params.key;

    const deleteParams = {
      Bucket: bucketName,
      Key: key,
    };

    return S3.send(new DeleteObjectCommand(deleteParams));
  };
  exports.deletePhoto = deletePhoto;
});

module.exports = app;
