import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js"
import {createContactSchema, updateContactSchema, updateFavotiteSchema} from "../schemas/contactsSchemas.js"
import auth from "../middlewares/auth.js";

const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact
} = contactsControllers;

const contactsRouter = express.Router();

contactsRouter.use(auth)

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

contactsRouter.patch("/:id/favorite", validateBody(updateFavotiteSchema), updateStatusContact);

export default contactsRouter;
