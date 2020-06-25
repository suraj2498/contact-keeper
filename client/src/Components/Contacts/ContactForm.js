import React, {useState, useContext} from 'react';
import ContactContext from '../../Context/Contact/ContactContext';

const ContactForm = () => {

    const contactContext = useContext(ContactContext);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    })

    const { name, email, phone, type } = contact;

    const onChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        contactContext.addContact(contact);
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">Add Contact</h2>
            <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />

            <input type="email" placeholder="E-mail" name="email" value={email} onChange={onChange} />

            <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange} />

            <h5>Contact Type</h5>
            <input className="mr-" type="radio" name="type" value="personal" checked={type === 'personal'} style={{marginRight: '5px'}} onChange={onChange}/> 
            <span style={{marginRight:'10px'}} >Personal</span>

            <input type="radio" name="type" value="professional" checked={type === 'professional'} style={{marginRight: '5px'}} onChange={onChange}/>
            <span>Professional</span> 

            <div>
                <input type="submit" value="Add Contact" className="btn btn-success btn-block"/>
            </div>
        </form>
    )
}

export default ContactForm;
