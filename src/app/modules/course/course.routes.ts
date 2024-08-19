import express from 'express';
import { CourseController } from './course.controller';

const router = express.Router();
// router.get(
//     '/',
//     CourseController.insertIntoDB
// );
// router.get('/:id', .getDataById);
router.post('/', CourseController.insertIntoDB);

export const CourseRouter = router;
