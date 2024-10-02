const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// List all contacts
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contacts:', error);
  }
}

// Get contact by ID
async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === contactId);
  } catch (error) {
    console.error('Error getting contact:', error);
  }
}

// Remove contact by ID
async function removeContact(contactId) {
  try {
    let contacts = await listContacts();
    contacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log('Contact removed:', contactId);
  } catch (error) {
    console.error('Error removing contact:', error);
  }
}

// Add new contact
async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: Date.now().toString(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log('Contact added:', newContact);
  } catch (error) {
    console.error('Error adding contact:', error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
