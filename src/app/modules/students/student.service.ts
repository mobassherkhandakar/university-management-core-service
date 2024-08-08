import { Student } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Student): Promise<Student> => {
  const result = await prisma.student.create({ data });
  return result;
};

export const StudentService = {
  insertIntoDB,
};
