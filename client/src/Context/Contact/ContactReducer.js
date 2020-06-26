import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

export default (state, action) => {
    switch(action.type){
        case ADD_CONTACT:
            return{
                ...state,
                contacts: [...state.contacts, action.payload]
            }

        case DELETE_CONTACT:
            return{
                ...state,
                // return all contact with id that isnt in the payload
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            }
        
        case SET_CURRENT:
            return{
                ...state,
                current: action.payload
            }

        case CLEAR_CURRENT:
            return{
                ...state,
                current: null
            }
        
        case UPDATE_CONTACT:
            return{
                ...state,
                contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact
            )}

        case FILTER_CONTACTS:
            return{
                ...state,
                filtered: state.contacts.filter(contact => {
                    // gi meeans gloabal case insensitive
                    // const regex = new RegExp(`${action.payload}`, 'gi');
                    // return contact.name.match(regex) || contact.email.match(regex);
                    const testString = `${contact.name}${contact.email}`.toLowerCase();
                    return testString.includes(action.payload.toLowerCase());
                })
            }


        case CLEAR_FILTER:
            return{
                ...state,
                filtered: null
            }

        default:
            return state;
    }
}