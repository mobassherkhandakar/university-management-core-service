import express from 'express';
import { CourseController } from './course.controller';

const router = express.Router();
router.get('/', CourseController.getAllFromDB);
router.patch('/:id', CourseController.updateOneInDB);
router.post('/', CourseController.insertIntoDB);
// router.post('/:id/assign-feculty', CourseController)

export const CourseRouter = router;
