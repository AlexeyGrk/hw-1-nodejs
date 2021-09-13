const fs = require("fs/promises");
const contacts = require("./db/contacts.json");
const listContacts = async () => contacts;
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  }
  return contacts;
};
const removeContact = async (contactId) => {};
const addContact = async (name, email, phone) => {};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
