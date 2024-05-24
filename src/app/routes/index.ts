import express from 'express';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.routes';
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.routes';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/academic-semester',
    route: AcademicSemesterRouter,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRouter,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
