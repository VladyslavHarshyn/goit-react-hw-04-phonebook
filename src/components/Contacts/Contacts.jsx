import PropTypes from 'prop-types';

import s from './Contacts.module.css';

const Contacts = ({ removeContact, getFilteredConatcts, handleFilter }) => {
  const elements = getFilteredConatcts.map(({ id, name, number }) => (
    <li key={id}>
      {name}: {number}{' '}
      <button className={s.btn} onClick={() => removeContact(id)}>
        Delete
      </button>
    </li>
  ));

  return (
    <>
      <label className={s.label}>
        Find contacts by name
        <input
          className={s.input}
          type="text"
          name="filter"
          placeholder="enter the name"
          onChange={handleFilter}
        ></input>
      </label>
      <ul>{elements}</ul>
    </>
  );
};

Contacts.propTypes = {
  removeContact: PropTypes.func.isRequired,
  getFilteredConatcts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  handleFilter: PropTypes.func.isRequired,
};

export default Contacts;
