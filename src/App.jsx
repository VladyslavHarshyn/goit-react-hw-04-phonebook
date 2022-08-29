import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';

import Section from './components/Section/Section';
import Form from './components/Form/Form';
import Contacts from './components/Contacts/Contacts';

const App = () => {
  const savedContacts = JSON.parse(localStorage.getItem('contacts'));

  const [contacts, setContacts] = useState(savedContacts ? savedContacts : []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const searchName = contacts.map(({ name }) => name);

    if (searchName.includes(name)) {
      return alert(`${name} is already in contacts`);
    }

    const id = nanoid();
    const newContact = { name, number, id };

    setContacts(prevContacts => {
      return [...prevContacts, newContact];
    });
  };

  const removeContact = id => {
    setContacts(prevState => prevState.filter(a => a.id !== id));
  };

  const getFiltredContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filterContacts = value => {
    setFilter(value);
  };

  return (
    <div>
      <Section title={'Phonebook'}>
        <Form onSubmit={addContact} />
      </Section>
      <Section title={'Contacts'}>
        <Contacts
          removeContact={removeContact}
          getFilteredConatcts={getFiltredContacts()}
          handleFilter={filterContacts}
        />
      </Section>
    </div>
  );
};
// class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const ContactsParse = JSON.parse(localStorage.getItem('users'));
//     if (ContactsParse) {
//       this.setState({ contacts: ContactsParse });
//     }
//   }

//   componentDidUpdate(prevState) {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem('users', JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = ({ name, number }) => {
//     const { contacts } = this.state;

//     if (contacts.find(el => el.name === name)) {
//       alert(`${name} is already in contacts`);
//     } else {
//       this.setState(({ contacts }) => {
//         const user = {
//           name,
//           number,
//           id: nanoid(),
//         };
//         return {
//           contacts: [...contacts, user],
//         };
//       });
//     }
//   };

//   removeContact = id => {
//     this.setState(({ contacts }) => {
//       return {
//         contacts: contacts.filter(item => item.id !== id),
//       };
//     });
//   };

//   getFilteredConatcts = () => {
//     const { filter, contacts } = this.state;

//     if (!filter) {
//       return contacts;
//     }
//     const filterValue = filter.toLowerCase();
//     const filteredContacts = contacts.filter(({ name }) => {
//       const nameValue = name.toLowerCase();
//       return nameValue.includes(filterValue);
//     });

//     return filteredContacts;
//   };

//   handleFilter = ({ target }) => {
//     this.setState({
//       filter: target.value,
//     });
//   };

//   render() {
//     return (
//       <div>
//         <Section title={'Phonebook'}>
//           <Form onSubmit={this.addContact} />
//         </Section>
//         <Section title={'Contacts'}>
//           <Contacts
//             removeContact={removeContact}
//             getFilteredConatcts={getFilteredConatcts()}
//             handleFilter={handleFilter}
//           />
//         </Section>
//       </div>
//     );
//   }
// }

export default App;
