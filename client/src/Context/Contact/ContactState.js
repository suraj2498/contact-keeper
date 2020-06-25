import React, { useReducer } from 'react';
import {uuid} from 'uuidv4';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = (props) => {

    const initialState = {
        contacts: [
            {
                id: '1',
                name: 'Larry',
                email: 'larry@gmail.com',
                phone: '111-111-1111',
                type: 'personal'
            },
            {
                id: '2',
                name: 'Jim',
                email: 'jim@gmail.com',
                phone: '222-222-2222',
                type: 'professional'
            },
            {
                id: '3',
                name: 'Monica',
                email: 'monica@gmail.com',
                phone: '333-333-3333',
                type: 'personal'
            }
        ],
        current: null
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);
    console.log(state + ' ' + dispatch);
    

    // Add Contact
    const addContact = (contact) => {
        contact.id = uuid();
        dispatch({type: ADD_CONTACT, payload: contact});
    } 

    // Delete Contact
    const deleteContact = (id) => {
        dispatch({type: DELETE_CONTACT, payload: id})
    }

    // Set Current Contact
    const setCurrent = (contact) => {
        dispatch({type: SET_CURRENT, payload: contact})
    }

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT})
    }

    // Update Contact

    // Filter Contacts

    // Clear Filter

    return (
        <ContactContext.Provider 
        value= {{
            contacts: state.contacts,
            current: state.current,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;