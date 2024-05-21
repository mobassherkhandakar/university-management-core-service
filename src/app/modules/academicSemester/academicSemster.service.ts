import { AcademicSemester } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({ data });
  return result;
};

export const AcademicSemesterService = {
  insertIntoDb,
};
