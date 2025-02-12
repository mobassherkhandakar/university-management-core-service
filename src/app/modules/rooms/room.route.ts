import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { RoomController } from './room.controller';

const router = express.Router();
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  RoomController.getAllFromDB
);
router.get('/:id', RoomController.getDataById);
router.post('/', RoomController.insertIntoDB);

export const RoomRouter = router;
