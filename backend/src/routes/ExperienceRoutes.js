import express from 'express';
import { getAllExperiences, getExperiencById } from '../controller/ExperienceController.js';

const router = express.Router();

router.get("/" , getAllExperiences);
router.get("/:id" , getExperiencById);

export default router;