import express from 'express';
import { AcademicSemsterController } from './academicSemester.controller';
const router = express.Router();
router.post('/', AcademicSemsterController.InsertIntoDB);
router.get('/', AcademicSemsterController.getAllFromDB);

export const AcademicSemesterRouter = router;
