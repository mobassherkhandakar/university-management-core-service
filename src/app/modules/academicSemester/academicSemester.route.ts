import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemsterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();
router.get('/', AcademicSemsterController.getAllFromDB);
router.get('/:id', AcademicSemsterController.getDataById);
router.post(
  '/',
  validateRequest(AcademicSemesterValidation.create),
  AcademicSemsterController.InsertIntoDB
);

export const AcademicSemesterRouter = router;
