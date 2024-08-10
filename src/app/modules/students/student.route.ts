import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { StudentController } from './student.controller';
const router = express.Router();

router.post('/', auth(ENUM_USER_ROLE.ADMIN), StudentController.insertIntoDB);

export const StudentRouter = router;
