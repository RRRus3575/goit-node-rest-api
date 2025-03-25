import fs from "node:fs/promises"
import  path  from "node:path"
import {fileURLToPath} from "node:url"
import DetectFileEncodingAndLanguage from "detect-file-encoding-and-language";
import { nanoid } from 'nanoid';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, "db", "contacts.json");
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
  