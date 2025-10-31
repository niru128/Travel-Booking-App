import express from 'express';
import {checkout} from '../controller/CheckoutController.js';

const router = express.Router();

router.post('/', checkout);

export default router;