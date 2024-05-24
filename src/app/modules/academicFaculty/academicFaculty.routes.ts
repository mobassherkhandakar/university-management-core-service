import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
const router = express.Router();
router.get('/', AcademicFacultyController.getAllFromDB);
// router.get('/:id', AcademicDepartmentController.getDataById);
router.post('/', AcademicFacultyController.InsertIntoDB);

export const AcademicFacultyRouter = router;
