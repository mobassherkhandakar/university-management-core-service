import { Course } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Course) => {
  const result = await prisma.course.create({ data });
  return result;
};

export const CourseService = {
  insertIntoDB,
};
