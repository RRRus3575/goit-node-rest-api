import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js"
import controllerWrapper from "../helpers/controllerWrapper.js"


const getAllContacts = async (req, res, next) => {
    const {id: owner} = req.user;
    const {favorite, page = 1, limit = 20 } = req.query;
    
    const data = await contactsService.listContacts({owner, favorite, page, limit})
    res.json(data)
  
};

const getOneContact = async (req, res, next) => {
    const {id: owner} = req.user;
    const { id } = req.params;
    const data = await contactsService.getContact({id, owner})
    if(!data){
        throw HttpError(404, `Not found`);
    }
    res.json(data)
};

const deleteContact = async (req, res, next) => {
    const {id: owner} = req.user;
    const { id } = req.params;
    const data = await contactsService.removeContact({id, owner})
    if(!data){
        throw HttpError(404, `Not found`);
    }
    res.json(data)
    
};

 const createContact = async (req, res, next) => {
    const {id: owner} = req.user;
    const newContact = await contactsService.addContact({...req.body, owner});
    res.status(201).json(newContact);
    
};

const updateContact = async (req, res, next) => {
    const {id: owner} = req.user;
    if (!Object.keys(req.body).length) {
        return res.status(400).json({ message: "Body must have at least one field" });
      }
    const {id} = req.params;   
    const data = await contactsService.changeContact({id, owner}, req.body)
    if(!data){
        throw HttpError(404, `Not found`);
    }
    res.json(data)
    
};

const updateStatusContact = async (req, res, next) => {
    const {id: owner} = req.user;
    const { id } = req.params;
    const {favorite } = req.body

    if (favorite === undefined) {
        return res.status(400).json({ message: "Body must have 'favorite'" });
    }

    const data = await contactsService.changeContact({id, owner}, {favorite})
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
    updateStatusContact: controllerWrapper(updateStatusContact)
}