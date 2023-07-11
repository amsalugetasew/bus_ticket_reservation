import express from 'express';

import {getContacts, createContact, deleteContact} from "../Controller/Contact.js";
const router = express.Router();
router.get("/contact/fetch", getContacts);
router.post("/contact/add", createContact);
router.delete("/contact/delete/:id", deleteContact);

export default router;