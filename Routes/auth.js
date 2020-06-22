const express = require('express');
const router = express.Router();

// @route GET api/auth
// @desc get logged in user
// @access Private
router.get('/', (req,res) => {
    res.json({msg: '/api/auth found getting logged in user'});
});

// @route POST api/auth
// @desc authorize user and get token
// @access Public
router.post('/', (req,res) => {
    res.json({msg: '/api/auth found verifying users credentials'});
});

module.exports = router;