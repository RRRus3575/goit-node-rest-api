import * as contactsService from "../services/contactsServices.js";


export const getAllContacts = async (req, res) => {
    try{
        const data = await contactsService.listContacts()
        res.json(data)
    } catch(error){
        res.status(500).json({
            message: error.message
        })
    }
};

export const getOneContact = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await contactsService.getContactById(id)
        res.json(data)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await contactsService.removeContact(id)
        res.json(data)
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
    
};

export const createContact = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ message: "Missing required fields" });
        }
  
        const newContact = await contactsService.addContact(name, email, phone);
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
    
};

export const updateContact = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return res.json({message: "You updated"})
        }
        const data = await contactsService.getContactById(id)
        res.json(data)
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
    
};

