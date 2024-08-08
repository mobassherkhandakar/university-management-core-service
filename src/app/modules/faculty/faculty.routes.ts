import express from 'express';
import { FacultyController } from './faculty.controller';
const router = express.Router();
// router.get('/', FacultyController.getAllFromDB);
// router.get('/:id', FacultyController.getDataById);
router.post('/', FacultyController.InsertIntoDB);

export const FacultyRouter = router;
