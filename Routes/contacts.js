const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/Auth');

const User = require('../Models/User');
const Contact = require('../Models/Contact');
const { findById } = require('../Models/User');


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
router.post('/', [auth, [
    // Validate that contact added atleast has name
    check('name', 'Please enter a name').not().isEmpty()
]], async (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array});
    }

    // Take all info added via request and creat a new contact and save
    const { name, email, phone, type} = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();
        res.json(contact);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'server error'});
    }
});

// @route PUT api/contacts/:id
// @desc update selected contact
// @access private
router.put('/:id', auth, async (req,res) => {
    
    const { name, email, phone, type } = req.body;

    // Build contact object
    const contactFields = {};
    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact)
            return res.status(404).json({ msg: 'Contact not found' });

        // Make sure user owns contact
        if(contact.user.toString() !== req.user.id)
            return res.status(401).json({msg: 'Not authorized'});

        contact = await Contact.findByIdAndUpdate(req.params.id, 
            {$set: contactFields},
            {new: true});
        
        res.json(contact)
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'server error'});
    }
});

// @route DELETE api/contacts/:id
// @desc delete contact
// @access private
router.delete('/:id', auth, async (req,res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if(!contact)
            return res.status(404).json({ msg: 'Contact not found' });

        // Make sure user owns contact
        if(contact.user.toString() !== req.user.id)
            return res.status(401).json({msg: 'Not authorized'});

        await Contact.findByIdAndRemove(req.params.id)

        res.json({mg: 'Contact Removed'}); 

    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg: 'server error'});
    }
});

module.exports = router;