const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const updateContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  };
  const newContact = { ...data, id: v4() };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, data) => {
  const contacts = await listContacts();
  const updateContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  };
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...data, contactId };
  await updateContacts(contacts);
  return contacts[idx];
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updateContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  };
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [deleteContact] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return deleteContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
