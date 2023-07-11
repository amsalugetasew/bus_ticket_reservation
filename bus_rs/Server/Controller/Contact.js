import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

// Contact Model
var ContactSchema = mongoose.Schema({
    fullName: String,
    phoneNumber: String,
    email: String,
    coment: String
});
const Contact = mongoose.models.ContactSchema || mongoose.model('Contact', ContactSchema);
app.use(cors());
app.use(bodyParser.json());

export const getContacts = (req, res) => {
    Contact.find().then(function (contact) {
        res.json(contact);
    });
}
export const createContact = (req, res) => {
    var contact = new Contact({
        fullName: req.body.fullName,
        email : req.body.email,
        phoneNumber : req.body.phoneNumber,
         coment : req.body.coment                     
    });
    contact.save()
        .then(contact => {
            res.status(200).json({ 'Contact': 'Contact added successfully' });
        })
        .catch(err => {
            res.send('Incorrect Contact Detail');
        });
    // console.log(fn);
    // res.send('Incorrect Contact Detail')
}
export const deleteContact = (req, res) => {
    const ContactToDelete = req.params.id;
    Contact.findByIdAndDelete({ _id: ContactToDelete })
        .then(deletedContact => res.send(deletedContact + "Deleted Successfully"))
        .catch(err => next(err));
    console.log('delete')
}