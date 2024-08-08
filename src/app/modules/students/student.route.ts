import express from 'express';
import { StudentController } from './student.controller';
const router = express.Router();

router.post('/', StudentController.insertIntoDB);

export const StudentRouter = router;
