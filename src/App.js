import { Component } from 'react';
import { connect } from 'react-redux';
import Title from './components/Title/Title';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import styles from './transitionStyles/app.module.css';
import phonebookOperations from './redux/phoneBook/phoneBook-operations';
import { getAllContacts } from './redux/phoneBook/phoneBook-selectors';

class App extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <div>
        <Title title="Phonebook" />

        <ContactForm />

        {this.props.contacts.length > 0 && (
          <h2 className={styles.title}>Contacts:</h2>
        )}

        <Filter />

        <ContactList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contacts: getAllContacts(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(phonebookOperations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
