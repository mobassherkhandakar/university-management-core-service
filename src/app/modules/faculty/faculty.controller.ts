import { Faculty } from '@prisma/client';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from '../../../shared/httpStatus';
import sendResponse from '../../../shared/sendResponse';
import { FacultyService } from './faculty.service';

const InsertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyService.InsertIntoDB(req.body);
  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Created Faculty successfully',
    data: result,
  });
});

export const FacultyController = {
  InsertIntoDB,
};
console.log('hello');
