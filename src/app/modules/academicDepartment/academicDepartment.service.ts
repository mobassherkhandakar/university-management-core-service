import { AcademicDepartment } from '@prisma/client';
import prisma from '../../../shared/prisma';

const InsertIntoDB = async (
  data: AcademicDepartment
): Promise<AcademicDepartment> => {
  const result = await prisma.academicDepartment.create({ data });
  return result;
};

export const AcademicDepartmentService = {
  InsertIntoDB,
};
