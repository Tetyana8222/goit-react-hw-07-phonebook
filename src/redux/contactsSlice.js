import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handleFetchContactsSuccess = (state, action) => {
  return {
    ...state,
    items: action.payload,
    isLoading: false,
    error: null,
  };
};
const handlePending = state => {
  return {
    ...state,
    isLoading: true,
  };
};
const handleRejected = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload,
  };
};
const handleAddContactSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    items: [action.payload, ...state.items],
  };
};
const handleDeleteContactSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: null,
    items: state.items.filter(item => item.id !== action.payload.id),
  };
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [fetchContacts.fulfilled]: handleFetchContactsSuccess,
    [fetchContacts.rejected]: handleRejected,
    [addContact.pending]: handlePending,
    [addContact.fulfilled]: handleAddContactSuccess,
    [addContact.rejected]: handleRejected,
    [deleteContact.pending]: handlePending,
    [deleteContact.fulfilled]: handleDeleteContactSuccess,
    [deleteContact.rejected]: handleRejected,
  },
});

export const contactsReducer = contactsSlice.reducer;
