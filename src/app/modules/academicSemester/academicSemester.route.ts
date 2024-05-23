import express from 'express';
import { AcademicSemsterController } from './academicSemester.controller';
const router = express.Router();
router.get('/', AcademicSemsterController.getAllFromDB);
router.get('/:id', AcademicSemsterController.getDataById);
router.post('/', AcademicSemsterController.InsertIntoDB);

export const AcademicSemesterRouter = router;
