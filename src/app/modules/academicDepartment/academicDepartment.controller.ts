import { AcademicDepartment } from '@prisma/client';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from '../../../shared/httpStatus';
import sendResponse from '../../../shared/sendResponse';
import { AcademicDepartmentService } from './academicDepartment.service';

const InsertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicDepartmentService.InsertIntoDB(req.body);
  sendResponse<AcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'created Department successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  InsertIntoDB,
};
