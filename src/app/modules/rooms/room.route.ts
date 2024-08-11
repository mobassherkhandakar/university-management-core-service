import express from 'express';
import { RoomController } from './room.controller';

const router = express.Router();
// router.get('/', AcademicSemsterController.getAllFromDB);
// router.get('/:id', AcademicSemsterController.getDataById);
router.post('/', RoomController.insertIntoDB);

export const RoomRouter = router;
