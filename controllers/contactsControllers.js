import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js"
import controllerWrapper from "../helpers/controllerWrapper.js"


const getAllContacts = async (req, res, next) => {
    const data = await contactsService.listContacts()
    res.json(data)
  
};

const getOneContact = async (req, res, next) => {
    const { id } = req.params;
    const data = await contactsService.getContactById(id)
    if(!data){
        throw HttpError(404, `Not found`);
    }
    res.json(data)
};

const deleteContact = async (req, res, next) => {
    const { id } = req.params;
    const data = await contactsService.removeContact(id)
    if(!data){
        throw HttpError(404, `Not found`);
    }
    res.json(data)
    
};

 const createContact = async (req, res, next) => {
    const newContact = await contactsService.addContact(req.body);
    res.status(201).json(newContact);
    
};

const updateContact = async (req, res, next) => {
    if (!Object.keys(req.body).length) {
        return res.status(400).json({ message: "Body must have at least one field" });
      }
    const {id} = req.params;       
    const data = await contactsService.changeContact(id, req.body)
    if(!data){
        throw HttpError(404, `Not found`);
    }
    res.json(data)
    
};

const updateFavorite = async (req, res, next) => {
    
    const { id } = req.params;
    const {favorite } = req.body

    if (typeof favorite !== 'boolean') {
        return res.status(400).json({ message: "'favorite' must be a boolean" });
    }

    const data = await contactsService.changeContact(id, req.body)
    if(!data){
        throw HttpError(404, `Not found`);
    }
    res.json(data)
}

export default {
    getAllContacts: controllerWrapper(getAllContacts),
    getOneContact: controllerWrapper(getOneContact),
    deleteContact: controllerWrapper(deleteContact),
    createContact: controllerWrapper(createContact),
    updateContact: controllerWrapper(updateContact),
    updateFavorite: controllerWrapper(updateFavorite)
}