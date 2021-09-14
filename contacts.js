const fs = require("fs/promises");
const path = require("path");
const contacts = require("./db/contacts.json");
const filePath = path.join(__dirname, "/db/contacts.json");

const listContacts = async () => contacts;
const getContactById = async (contactId) => {
  const contactsList = await listContacts();

  const contact = contactsList.find((item) => item.id === contactId);

  if (!contact) {
    return null;
  }
  return contact;
};
const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const idx = contactsList.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contactsList.splice(idx, 1);
  await updateContact(contactsList);
  return "Success remove";
};
const addContact = async ({ name, phone, email, id }) => {
  const contactsList = await listContacts();
  const newContact = { name, phone, email, id };

  const newProducts = [...contactsList, newContact];

  await updateContact(newProducts);
  return newContact;
};
const updateContact = async (newContacts) => {
  await fs.writeFile(filePath, JSON.stringify(newContacts));
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
