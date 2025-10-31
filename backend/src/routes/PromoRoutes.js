import express from 'express';
import { validatePromo } from '../controller/PromoController.js';

const router = express.Router();

router.post('/validate', validatePromo);

export default router;