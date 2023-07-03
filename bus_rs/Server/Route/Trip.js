import express from 'express';
import { getTripes, createTrip, getTrip, deleteTrip, editTrip, getTripeInfo, getagregated} from "../Controller/Trip.js";
const router = express.Router();

router.get("/trip/fetch", getTripes);
router.post("/getagregated/seat", getagregated);
router.post("/trip/ab/fetch", getTripeInfo);
router.post("/trip/Add", createTrip);
router.get("/trip/:id", getTrip);
router.delete("/trip/delete/:id", deleteTrip);
router.put("/trip/:id", editTrip);


export default router;