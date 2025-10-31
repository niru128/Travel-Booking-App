import express from 'express';
import { createBooking,getAllBookings,updateBookingStatus } from '../controller/BookingController.js';
const router = express.Router();


router.post('/', createBooking);
router.get('/', getAllBookings);
router.patch('/:id', updateBookingStatus);

export default router;