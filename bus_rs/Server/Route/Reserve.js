import express from 'express';
import { getReservees, createReserve, getReserve, deleteReserve, editReserve, getReserveInfo, seatInfo, cancelReserveInfo, cancelReserve} from "../Controller/Reservation.js";
const router = express.Router();

router.get("/reserve/fetch", getReservees);
router.post("/reserve/cancel/fetch", cancelReserveInfo);
router.post("/seat/info/fetch", seatInfo);
router.post("/reserve/ab/fetch", getReserveInfo);
router.post("/reserve/Add", createReserve);
router.get("/reserve/:id", getReserve);
router.delete("/reserve/delete/:id", deleteReserve);
router.put("/reserve/:id", editReserve);
router.put("/cancel/:id", cancelReserve);


export default router;