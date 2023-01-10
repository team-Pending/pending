const router = require('express').Router();
const User = require('../models/User');
const withAuth = require('../utils/auth');
const Note = require('../models/Note');

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      // include: [{ model: Upload }],
    });
    const allNotes = await Note.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ['key', 'title', 'description', 'date', 'user_id'],
    });
    console.log(allNotes);
    const notes = allNotes.map((note) => note.get({ plain: true }));
    console.log(notes);
    const user = userData.get({ plain: true });
    console.log(user);
    res.render('profile', {
      ...user,
      logged_in: true,
      notes,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

// note route
router.get('/', async (req, res) => {
  try {
    const allNotes = await Note.findAll({
      attributes: ['key', 'title', 'description', 'date', 'user_id'],
      order: [['key', 'DESC']]
    });
    const notes = allNotes.map((note) => note.get({ plain: true }));
    res.render('home', {
      notes,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
});

module.exports = router;
