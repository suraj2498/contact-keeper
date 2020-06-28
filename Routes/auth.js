const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult} = require('express-validator');
const config = require('config');
const auth = require('../middleware/Auth');

// @route GET api/auth
// @desc get logged in user
// @access Private
router.get('/', auth, async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

// @route POST api/auth
// @desc authorize user and get token (login)
// @access Public
router.post('/', [
    // Check that users put in all fields (login)
    check('email', 'Please Include a valid email'),
    check('password', 'Password is required').exists()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    // Check 
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({msg: 'No Such Email'});
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({msg: 'Incorrect Password'});
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        // Generates JWT
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
});

module.exports = router; 