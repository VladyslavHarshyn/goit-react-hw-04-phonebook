import { nanoid } from 'nanoid';
import { Component } from 'react';

import Section from './components/Section/Section';
import Form from './components/Form/Form';
import Contacts from './components/Contacts/Contacts';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const ContactsParse = JSON.parse(localStorage.getItem('users'));
    if (ContactsParse) {
      this.setState({ contacts: ContactsParse });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('users', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    const { contacts } = this.state;

    if (contacts.find(el => el.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      this.setState(({ contacts }) => {
        const user = {
          name,
          number,
          id: nanoid(),
        };
        return {
          contacts: [...contacts, user],
        };
      });
    }
  };

  removeContact = id => {
    this.setState(({ contacts }) => {
      return {
        contacts: contacts.filter(item => item.id !== id),
      };
    });
  };

  getFilteredConatcts = () => {
    const { filter, contacts } = this.state;

    if (!filter) {
      return contacts;
    }
    const filterValue = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) => {
      const nameValue = name.toLowerCase();
      return nameValue.includes(filterValue);
    });

    return filteredContacts;
  };

  handleFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  render() {
    return (
      <div>
        <Section title={'Phonebook'}>
          <Form onSubmit={this.addContact} />
        </Section>
        <Section title={'Contacts'}>
          <Contacts
            removeContact={this.removeContact}
            getFilteredConatcts={this.getFilteredConatcts()}
            handleFilter={this.handleFilter}
          />
        </Section>
      </div>
    );
  }
}

export default App;
