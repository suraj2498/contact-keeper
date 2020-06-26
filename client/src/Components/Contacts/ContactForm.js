import React, {useState, useContext, useEffect} from 'react';
import ContactContext from '../../Context/Contact/ContactContext';

const ContactForm = () => {

    const contactContext = useContext(ContactContext);

    const { addContact, current, clearCurrent, updateContact } = contactContext;

    useEffect(() => {
        if(current !== null){
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
        // Run this everytime contactContext or current is changed
    }, [contactContext, current]); 

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
        if(current){
            updateContact(contact); // contact is state of the form
        } else {
            addContact(contact);
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
        clearAll();
    }

    const clearAll = () => {
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />

            <input type="email" placeholder="E-mail" name="email" value={email} onChange={onChange} />

            <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange} />

            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal" checked={type === 'personal'} style={{marginRight: '5px'}} onChange={onChange}/> 
            <span style={{marginRight:'10px'}} >Personal</span>

            <input type="radio" name="type" value="professional" checked={type === 'professional'} style={{marginRight: '5px'}} onChange={onChange}/>
            <span>Professional</span> 

            <div>
                <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-success btn-block"/>
            </div>
            {current && <div>
                <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
            </div>}
        </form>
    )
}

export default ContactForm;
