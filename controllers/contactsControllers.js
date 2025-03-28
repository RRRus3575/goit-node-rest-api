import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js"
import controllerWrapper from "../decorators/controllerWrapper.js"


const getAllContacts = async (req, res, next) => {
        const data = await contactsService.listContacts()
        res.json(data)
  
};

const getOneContact = async (req, res, next) => {
        const { id } = req.params;
        const data = await contactsService.getContactById(id)
        if(!data){
            throw HttpError(404, `Contact with id=${id} not found`);
        }
        res.json(data)
};

const deleteContact = async (req, res, next) => {
        const { id } = req.params;
        const data = await contactsService.removeContact(id)
        if(!data){
            throw HttpError(404, `Contact with id=${id} not found`);
        }
        res.json(data)
    
};

 const createContact = async (req, res, next) => {
  
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ message: "Missing required fields" });
        }
  
        const newContact = await contactsService.addContact(name, email, phone);
        res.status(201).json(newContact);
    
};

const updateContact = async (req, res, next) => {

        const {id} = req.params;
        const { name, email, phone } = req.body;
        if (!name & !email & !phone) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const data = await contactsService.changeContact(id)
        if(!data){
            throw HttpError(404, `Contact with id=${id} not found`);
        }
        res.json(data)
    
};

export default {
    getAllContacts: controllerWrapper(getAllContacts),
    getOneContact: controllerWrapper(getOneContact),
    deleteContact: controllerWrapper(deleteContact),
    createContact: controllerWrapper(createContact),
    updateContact: controllerWrapper(updateContact)
}