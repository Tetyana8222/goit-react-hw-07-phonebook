import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/contactsSlice';
import { nanoid } from 'nanoid';
import { Form, TextFiled, Label, AddcontactBtn } from './ContactForm.styled';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector(getContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeInput = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleSubmitForm = event => {
    event.preventDefault();
    const newContact = {
      id: nanoid(3),
      name,
      number,
    };
    if (checkContactNameRepeat(name)) {
      alert(`${name} already exists`);
    } else {
      dispatch(addContact(newContact));
    }

    resetState();
  };
  const resetState = () => {
    setName('');
    setNumber('');
  };

  const checkContactNameRepeat = name => {
    const temporaryNameArray = contacts.map(item => item.name);
    // console.log(temporaryNameArray);
    return temporaryNameArray.includes(name);
  };
  return (
    <Form onSubmit={handleSubmitForm}>
      <Label>
        Name
        <TextFiled
          onChange={handleChangeInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
        />
      </Label>
      <Label htmlFor="">
        Number
        <TextFiled
          onChange={handleChangeInput}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
        />
      </Label>
      <AddcontactBtn type="submit">ADD CONTACT</AddcontactBtn>
    </Form>
  );
};
