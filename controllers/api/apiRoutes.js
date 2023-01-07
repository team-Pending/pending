const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const { uploadFile, getFileStream, deletePhoto } = require('../s3');
const uploadImage = require('../../utils/uploadImg');
const Note = require('../../models/Note');

router.get('/images/:key', (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

router.post('/image', upload.single('image'), async function (req, res) {
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
router.delete('/notes/:key', async (req, res) => {
  console.log('begin ' + req.params + ' end');
  try {
    console.log(req.params.key + ' this is the key you destroyed');
    const noteData = await Note.destroy({
      where: {
        key: req.params.key,
      },
    });
    // deletePhoto(req.params.key);

    if (!noteData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
});

module.exports = router;
