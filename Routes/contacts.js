const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../Models/User');
const Contact = require('../Models/Contact');

// @route GET api/contacts
// @desc get users contacts
// @access Private
router.get('/', auth, async (req,res) => {
    // Find all contacts that are associated with current user id
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({date: -1});

        res.json(contacts)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// @route POST api/contacts
// @desc add new contact
// @access private
router.post('/', (req,res) => {
    res.json({msg: '/api/contacts adding all contacts'});
});

// @route PUT api/contacts/:id
// @desc update selcted contact
// @access private
router.put('/:id', (req,res) => {
    res.json({msg: '/api/contacts/:id updating selected contact'});
});

// @route DELETE api/contacts/:id
// @desc delete contact
// @access private
router.delete('/', (req,res) => {
    res.json({msg: '/api/contacts/:id deleting selected contact'});
});

module.exports = router;