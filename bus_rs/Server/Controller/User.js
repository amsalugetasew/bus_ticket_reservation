import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import Cryptr from 'cryptr';

// Bus Model
var UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    role: String,
    email: String,
    password: String
});
const User = mongoose.models.UserSchema || mongoose.model('User', UserSchema);
app.use(cors());
app.use(bodyParser.json());

export const getUseres = (req, res) => {
    User.find().then(function (user) {
        res.json(user);
    });
}
export const getUser = (req, res, next) => {

    const id = req.params.id;
    User.findById({ _id: id })
        .then(user => res.json(user))
        .catch(err => next(err));
}

export const chnangeUserPassword = (req, res, next) =>{
    let userEmail = req.body.email;
    let password = req.body.password
    User.find({ email: userEmail }).exec()
    .then(function (user) 
    {
            let userToEdit = user[0]._id
                const cryptr = new Cryptr("yoursecretkey");
                var encpassword = cryptr.encrypt(req.body.password);
                User.findByIdAndUpdate({ _id: userToEdit },
                    {
                        password: encpassword
                    })
                    .then(editedUser => res.json(editedUser))
                    .catch(err => next(err))
    });
    
}
export const findUser = (req, res) => {
    let userEmail = req.body.email;
    
    User.find({ email: userEmail }).exec()
        .then(function (user) 
        {
                res.send(user)
        });
}

export const login = (req, res) => {
    let userEmail = req.body.email;
    let userPassword = req.body.password
    // console.log(userEmail,req.body.password)
    const cryptr = new Cryptr("yoursecretkey");
    var decPassword = "";
    User.find({ email: userEmail }).exec()
        .then(function (user) {
            if (user.length !== 0) {
                decPassword = cryptr.decrypt(user[0].password)
                if (decPassword === userPassword) {
                    res.send(userEmail)
                }
                else {
                    res.send("Incorrect Email or Password")
                }
            }
        });
}
export const createUser = (req, res) => {
    let userEmail = req.body.email
    
    User.find({ email: userEmail }).exec()
        .then(function (user) {
            if (user.length !== 0) {
                res.send("Email Alread exist")
            }
            else {
                const cryptr = new Cryptr("yoursecretkey");
                var encpassword = cryptr.encrypt(req.body.password);
                var user = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    role: req.body.role,
                    email: req.body.email,
                    password: encpassword
                });
                user.save()
                    .then(user => {
                        res.send(userEmail + ' User added successfully');
                    })
                    .catch(err => {
                        res.send('adding new User failed');
                    });
            }
        });
}

export const deleteUser = (req, res) => {

    const UserToDelete = req.params.id;
    User.findByIdAndDelete({ _id: UserToDelete })
        .then(deletedUser => res.send(deletedUser + "Deleted Successfully"))
        .catch(err => next(err));
}
export const editUser = (req, res) => {
    const userToEdit = req.params.id;
    User.findByIdAndUpdate({ _id: userToEdit },
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role,
            email: req.body.email,
            password: req.body.password
        })
        .then(editedUser => res.json(editedUser))
        .catch(err => next(err))
}