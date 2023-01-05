const router = require('express').Router();
const User = require('../models/User');
const withAuth = require('../utils/auth');
const Note = require('../models/note');

router.get('/', async (req, res) => {
        res.redirect('/login');
});

router.get('/upload', async (req, res) => {
  res.render('upload');
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      // include: [{ model: Upload }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
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

router.get('/home', withAuth, async (req, res) => {
  // Once user logs in, takes to home page added by lab line 41-51

  const userData = await Upload.findAll({
    attributes: { exclude: ['password'] },
    //NEED ASSISTANCE WITH INCLUDING USER UPLOADS
    // include: [User]
  })
  const users = userData.map(user => user.get({ plain: true }))
  res.render('home', {users});
  
});
      
module.exports= router;