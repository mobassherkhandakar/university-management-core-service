/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course, CourseFaculty } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import {
  paginationHelpers,
  SortOrder,
} from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import httpStatus from '../../../shared/httpStatus';
import prisma from '../../../shared/prisma';
import { asyncForEach } from '../../../utils/asyncForEach';
import { CourseSearchAbleField } from './course.contants';
import {
  ICourseData,
  ICourseFilterAblField,
  IPrerequisiteCourseRequest,
} from './course.interface';

const insertIntoDB = async (data: ICourseData): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;

  const newCourse = await prisma.$transaction(async trancjectionClient => {
    const result = await trancjectionClient.course.create({ data: courseData });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create course');
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      await asyncForEach(
        preRequisiteCourses,
        async (newCourse: IPrerequisiteCourseRequest) => {
          await trancjectionClient.courseToPrerequisite.create({
            data: {
              courseId: result.id,
              preRequisiteId: newCourse.courseId,
            },
          });
        }
      );
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
const getAllFromDB = async (
  pagination: IPaginationOptions,
  filters: ICourseFilterAblField
): Promise<IGenericResponse<Course[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const { searchTerm, ...filterData } = filters;
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      OR: CourseSearchAbleField.map(field => ({
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
  const result = await prisma.course.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: sortCondition,
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
  const total = await prisma.course.count({
    where: whereCondition,
  });
  return {
    meta: {
      limit,
      page,
      total,
    },
    data: result,
  };
};
const updateOneInDB = async (id: string, payload: ICourseData) => {
  const { preRequisiteCourses, ...coursData } = payload;
  await prisma.$transaction(async transactionClint => {
    const result = await transactionClint.course.update({
      where: {
        id,
      },
      data: coursData,
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to update Courses');
    }
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletePreRequisite = preRequisiteCourses.filter(
        coursePreriquisite =>
          coursePreriquisite.courseId && coursePreriquisite.isDeleted
      );

      const newPreRequistie = preRequisiteCourses.filter(
        coursePreRequisite =>
          coursePreRequisite.courseId && !coursePreRequisite.isDeleted
      );

      await asyncForEach(
        deletePreRequisite,
        async (deletePreCourse: IPrerequisiteCourseRequest) => {
          await transactionClint.courseToPrerequisite.deleteMany({
            where: {
              AND: [
                {
                  courseId: id,
                },
                {
                  preRequisiteId: deletePreCourse.courseId,
                },
              ],
            },
          });
        }
      );

      await asyncForEach(
        newPreRequistie,
        async (newCourse: IPrerequisiteCourseRequest) => {
          await transactionClint.courseToPrerequisite.create({
            data: {
              courseId: id,
              preRequisiteId: newCourse.courseId,
            },
          });
        }
      );
    }

    return result;
  });
  const responseData = await prisma.course.findUnique({
    where: {
      id,
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
};
const assinendFaculty = async (id: string, payload: string[]) => {
  await prisma.courseFaculty.createMany({
    data: payload.map(facultyId => ({
      courseId: id,
      facultyId: facultyId,
    })),
  });
  const assignFacultiesData = await prisma.courseFaculty.findMany({
    where: {
      courseId: id,
    },
    include: {
      Faculty: true,
    },
  });

  return assignFacultiesData;
};
const removeFaculties = async (
  id: string,
  payload: string[]
): Promise<CourseFaculty[] | null> => {
  await prisma.courseFaculty.deleteMany({
    where: {
      courseId: id,
      facultyId: {
        in: payload,
      },
    },
  });

  const assignFacultiesData = await prisma.courseFaculty.findMany({
    where: {
      courseId: id,
    },
    include: {
      Faculty: true,
    },
  });

  return assignFacultiesData;
};

export const CourseService = {
  insertIntoDB,
  updateOneInDB,
  getAllFromDB,
  assinendFaculty,
  removeFaculties,
};
