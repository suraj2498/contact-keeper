const express = require('express');
const router = express.Router();

// @route GET api/contacts
// @desc get users contacts
// @access Private
router.get('/', (req,res) => {
    res.json({msg: '/api/contacts found getting all user contacts'});
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