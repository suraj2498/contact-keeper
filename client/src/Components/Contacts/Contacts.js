import React, {Fragment, useContext} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import ContactItem from './ContactItem';
import ContactContext from '../../Context/Contact/ContactContext';

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const { contacts, filtered } = contactContext;

    if(contacts.length === 0){
        return <h3>No Contacts Recorded</h3>
    }

    return (
        <Fragment>
            <TransitionGroup>
                {filtered !== null ? filtered.map(contact => (
                    <CSSTransition key={contact.id} timeout={300} classNames="item">
                        <ContactItem contact={contact}/>
                    </CSSTransition>
                ))
                : 
                contacts.map((contact) => (
                    <CSSTransition key={contact.id} timeout={500} classNames="item">
                        <ContactItem contact={contact}/>
                    </CSSTransition>
                    ))
                }
            </TransitionGroup>
        </Fragment>
    )
}

export default Contacts;
