import { useDispatch, useSelector } from 'react-redux';
import * as selectors from 'redux/selectors';
import { addContact } from 'redux/operations';
import { nanoid } from 'nanoid';
import { Form, TextFiled, Label, AddcontactBtn } from './ContactForm.styled';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectors.selectContacts);

  const handleSubmitForm = event => {
    event.preventDefault();
    const newContact = {
      id: nanoid(3),
      name: event.currentTarget.elements.name.value,
      number: event.currentTarget.elements.number.value,
    };

    if (checkContactNameRepeat(newContact.name)) {
      alert(`${newContact.name} already exists`);
    } else {
      dispatch(addContact(newContact));
      event.currentTarget.reset();
    }
  };

  const checkContactNameRepeat = name => {
    const temporaryNameArray = contacts.map(item => item.name);
    return temporaryNameArray.includes(name);
  };
  return (
    <Form onSubmit={handleSubmitForm}>
      <Label>
        Name
        <TextFiled
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label htmlFor="">
        Number
        <TextFiled
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <AddcontactBtn type="submit">ADD CONTACT</AddcontactBtn>
    </Form>
  );
};
