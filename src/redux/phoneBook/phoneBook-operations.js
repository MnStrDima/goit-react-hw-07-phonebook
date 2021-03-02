import axios from 'axios';
import {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
} from './phoneBook-actions';

axios.defaults.baseURL = 'http://localhost:4040';

const fetchContacts = () => async dispatch => {
  dispatch(fetchContactsRequest());

  try {
    const { data } = await axios.get('/contacts');
    console.log(data);
    if (data) {
      return dispatch(fetchContactsSuccess(data));
    }
    return Promise.reject(new Error(`Sorry... Something went wrong.`));
  } catch (error) {
    dispatch(fetchContactsError(error.message));
  }
};

const addContact = contactObj => async dispatch => {
  dispatch(addContactRequest());

  try {
    const { data } = await axios.post('/contacts', contactObj);

    if (data) {
      return dispatch(addContactSuccess(data));
    }
    return Promise.reject(new Error(`Sorry... Something went wrong.`));
  } catch (error) {
    dispatch(addContactError(error.message));
  }
};

const deleteContact = contactId => async dispatch => {
  dispatch(deleteContactRequest());

  try {
    const response = await axios.delete(`/contacts/${contactId}`);

    if (response) {
      return dispatch(deleteContactSuccess(contactId));
    }
    return Promise.reject(new Error(`Sorry... Something went wrong.`));
  } catch (error) {
    dispatch(deleteContactError(error.message));
  }
};

export default { addContact, deleteContact, fetchContacts };
