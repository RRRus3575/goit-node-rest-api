import fs from "node:fs/promises"
import  path  from "node:path"
import DetectFileEncodingAndLanguage from "detect-file-encoding-and-language";
import { nanoid } from 'nanoid';


const contactsPath = path.join( "db", "contacts.json");
const { encoding } = await DetectFileEncodingAndLanguage(contactsPath)



export async function listContacts() {
    const list = await fs.readFile(contactsPath, encoding)
    return JSON.parse(list) 
  }
  
  export async function getContactById(contactId) {
    const list = await listContacts();
    if (!Array.isArray(list)) {
      throw new Error("Contacts data is not an array");
    }
    const contact = list.find((item) => item.id === contactId) || null;
    return contact;
  }
  
  export async function removeContact(contactId) {
    const list = await listContacts();
    if (!Array.isArray(list)) {
      throw new Error("Contacts data is not an array");
    }
    const updatedList = list.filter((item) => item.id !== contactId);
    if (updatedList.length !== list.length) {
      await fs.writeFile(contactsPath, JSON.stringify(updatedList, null, 2), encoding);
      const removedContact = list.find((item) => item.id === contactId);
      return removedContact;
    }
    return null;
  }
  
  export async function addContact(name, email, phone) {
    const list = await listContacts();
    if (!Array.isArray(list)) {
      throw new Error("Contacts data is not an array");
    }
    const contact = {
      id: nanoid(21),
      name,
      email,
      phone,
    };
    list.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2), encoding);
    return contact;
  }
  
export async function changeContact(contactId, updatedData) {
  const list = await listContacts();

  const index = list.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }

  const filteredData = Object.fromEntries(
    Object.entries(updatedData).filter(([_, value]) => value !== undefined)
  );

  list[index] = {
    ...list[index],
    ...filteredData,
  };

  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2), encoding);

  return await list[index];
}
