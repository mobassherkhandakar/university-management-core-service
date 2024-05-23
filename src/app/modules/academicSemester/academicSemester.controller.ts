import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from '../../../shared/httpStatus';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemster.service';
import { AcademicSemesterFilterAbleFileds } from './academicSmester.constants';

const InsertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.insertIntoDB(req.body);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, AcademicSemesterFilterAbleFileds);
  const result = await AcademicSemesterService.getAllFromDB(
    paginationOptions,
    filters
  );

  sendResponse<AcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get all semesters Data',
    meta: result.meta,
    data: result.data,
  });
});

export const AcademicSemsterController = {
  InsertIntoDB,
  getAllFromDB,
};
