/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from '../../../errors/ApiError';
import httpStatus from '../../../shared/httpStatus';
import prisma from '../../../shared/prisma';
import { ICourseData } from './course.interface';

const insertIntoDB = async (data: ICourseData): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;

  const newCourse = await prisma.$transaction(async trancjectionClient => {
    const result = await trancjectionClient.course.create({ data: courseData });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course');
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      for (let index = 0; index < preRequisiteCourses.length; index++) {
        await trancjectionClient.courseToPrerequisite.create({
          data: {
            courseId: result.id,
            preRequisiteId: preRequisiteCourses[index].courseId,
          },
        });
      }
    }
    return result;
  });
  if (newCourse) {
    const responseData = await prisma.course.findUnique({
      where: {
        id: newCourse.id,
      },
      include: {
        preRequisite: {
          include: {
            preRequisite: true,
          },
        },
        preRequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });

    return responseData;
  }
  throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course');
};

export const CourseService = {
  insertIntoDB,
};
