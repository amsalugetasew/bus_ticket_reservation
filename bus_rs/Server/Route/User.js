import express from 'express';

import {getUseres, getUser, createUser, deleteUser, editUser, login} from "../Controller/User.js";
const router = express.Router();
router.get("/user/fetch", getUseres);
router.post("/users/Add", createUser);
router.get("/user/:id", getUser);
router.delete("/user/delete/:id", deleteUser);
router.put("/user/edit/:id", editUser);
router.post("/users/login", login);

export default router;