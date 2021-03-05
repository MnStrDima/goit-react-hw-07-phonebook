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
  errorRemover,
} from './phoneBook-actions';

const resetError = dispatch =>
  setTimeout(() => dispatch(errorRemover(null)), 3000);

axios.defaults.baseURL = 'http://localhost:4040';

const fetchContacts = () => async dispatch => {
  dispatch(fetchContactsRequest());

  try {
    const { data } = await axios.get('/contacts');
    if (data) {
      return dispatch(fetchContactsSuccess(data));
    }
    return Promise.reject(new Error(`Sorry... Something went wrong.`));
  } catch (error) {
    dispatch(fetchContactsError(error.message));
    resetError(dispatch);
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
    resetError(dispatch);
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
    resetError(dispatch);
  }
};

export default { addContact, deleteContact, fetchContacts };
