import { AcademicFaculty } from '@prisma/client';
import { Request, Response } from 'express';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from '../../../shared/httpStatus';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicFacultyFilterAbleFileds } from './academicFaculty.constants';
import { AcademicFacultyService } from './academicFaculty.service';

const InsertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicFacultyService.InsertIntoDB(req.body);
  sendResponse<AcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'created Department successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, AcademicFacultyFilterAbleFileds);
  const result = await AcademicFacultyService.getAllFromDB(
    paginationOptions,
    filters
  );

  sendResponse<AcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get all semesters Data',
    meta: result.meta,
    data: result.data,
  });
});

// const getDataById = catchAsync(async (req: Request, res: Response) => {
//   const result = await AcademicFacultyService.getDataById(req.params.id);
//   sendResponse<AcademicFaculty | null>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Get single Semester data',
//     data: result,
//   });
// });

export const AcademicFacultyController = {
  InsertIntoDB,
  getAllFromDB,
  // getDataById,
};
