import express from 'express';
import { BuildingController } from './building.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingValidation } from './building.validation';
const router = express.Router();
// router.get('/', AcademicSemsterController.getAllFromDB);
// router.get('/:id', AcademicSemsterController.getDataById);
router.post(
  '/',
  validateRequest(BuildingValidation.create),
  BuildingController.insertIntoDB
);

export const BuildingRouter = router;
