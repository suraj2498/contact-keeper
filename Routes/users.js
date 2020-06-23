const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult} = require('express-validator');
const config = require('config');

// @route POST api/users
// @desc Register a user
// @access Public

router.post('/', [
    // Validate form fields
    check('name', 'Please add your Name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 })
] , async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { name, email, password} = req.body;
    try{
        // Verify that no other usesr exists then save profile after hashing process
        let user = await User.findOne({ email });

        if(user){
            res.status(400).json({ msg: "User already exists" });
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);
        
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

        // Save user
        await user.save();

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;