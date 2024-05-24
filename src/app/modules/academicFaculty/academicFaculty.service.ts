/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicFaculty } from '@prisma/client';
import {
  SortOrder,
  paginationHelpers,
} from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { AcademicFacultySearchAbleFileds } from './academicFaculty.constants';
import { IAcademicFacultyFilters } from './academicFaculty.interface';

const InsertIntoDB = async (
  data: AcademicFaculty
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({ data });
  return result;
};
const getAllFromDB = async (
  paginations: IPaginationOptions,
  filters: IAcademicFacultyFilters
): Promise<IGenericResponse<AcademicFaculty[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginations);
  const { searchTerm, ...filterData } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      OR: AcademicFacultySearchAbleFileds.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map(field => ({
        [field]: {
          equals: (filterData as any)[field],
        },
      })),
    });
  }

  const sortCondition: { [kay: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder as SortOrder;
  }
  const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
  const result = await prisma.academicFaculty.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: sortCondition,
  });

  const total = await prisma.academicFaculty.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const AcademicFacultyService = {
  InsertIntoDB,
  getAllFromDB,
};
