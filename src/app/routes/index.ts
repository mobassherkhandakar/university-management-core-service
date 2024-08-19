import express from 'express';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.routes';
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.routes';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { BuildingRouter } from '../modules/building/building.route';
import { CourseRouter } from '../modules/course/course.routes';
import { FacultyRouter } from '../modules/faculty/faculty.routes';
import { RoomRouter } from '../modules/rooms/room.route';
import { StudentRouter } from '../modules/students/student.route';

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
  {
    path: '/faculty',
    route: FacultyRouter,
  },
  {
    path: '/student',
    route: StudentRouter,
  },
  {
    path: '/building',
    route: BuildingRouter,
  },
  {
    path: '/room',
    route: RoomRouter,
  },
  {
    path: '/course',
    route: CourseRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
