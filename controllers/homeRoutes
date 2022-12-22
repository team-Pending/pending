const router = require('express').Router();
const User = require('../models/User');
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
        res.render('home');
});

router.get('/login', async (req, res) => {
        res.render('login');
});
router.get('/profile', async (req, res) => {
        res.render('profile');
});


module.exports= router;