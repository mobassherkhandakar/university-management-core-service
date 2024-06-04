import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
const router = express.Router();
// router.get('/', AcademicDepartmentController.getAllFromDB);
// router.get('/:id', AcademicDepartmentController);
router.post('/', AcademicDepartmentController.InsertIntoDB);

export const AcademicDepartmentRouter = router;
