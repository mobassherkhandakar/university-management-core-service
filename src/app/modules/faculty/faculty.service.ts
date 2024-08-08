import { Faculty } from '@prisma/client';
import prisma from '../../../shared/prisma';

const InsertIntoDB = async (data: Faculty): Promise<Faculty> => {
  const result = await prisma.faculty.create({
    data,
  });

  return result;
};

export const FacultyService = {
  InsertIntoDB,
};
