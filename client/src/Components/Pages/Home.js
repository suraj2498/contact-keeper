import React from 'react'
import Contacts from '../Contacts/Contacts';
import ContactForm from '../Contacts/ContactForm';

const Home = () => {
    return (
        <div className="grid-2">
            {/* Form */}
           <div>
               <ContactForm />
           </div>


            {/* Contacts */}
           <div>
               <Contacts />
           </div>
        </div>
    )
}

export default Home;
