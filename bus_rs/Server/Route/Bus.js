import express from 'express';
import {getBuses, createBus, getBus, deleteBus,editBus, getNumberOfSeat} from "../Controller/Bus.js";
const router = express.Router();

router.get("/bus/fetch", getBuses);
router.post("/bus/Add", createBus);
router.get("/bus/:id", getBus);
router.delete("/bus/delete/:id", deleteBus);
router.put("/bus/:id", editBus);
router.post("/get/numberofseat/fetch", getNumberOfSeat);

export default router;