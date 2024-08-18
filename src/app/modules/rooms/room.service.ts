/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Room } from '@prisma/client';
import {
  paginationHelpers,
  SortOrder,
} from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { RoomSearchAbleField } from './room.constant';
import { IRoomFilterabelField } from './room.interface';

const insertIntoDB = async (data: Room): Promise<Room> => {
  const result = await prisma.room.create({ data });
  return result;
};

const getAllFromDB = async (
  pagination: IPaginationOptions,
  filters: IRoomFilterabelField
): Promise<IGenericResponse<Room[]>> => {
  console.log(filters);
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const { searchTerm, ...filterData } = filters;
  const andCondition = [];
  //Searching Data
  if (searchTerm) {
    andCondition.push({
      OR: RoomSearchAbleField.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  console.log(searchTerm);
  //Filtering Data
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map(field => ({
        [field]: {
          equals: (filterData as any)[field],
        },
      })),
    });
  }
  //Sorting Data
  const sortCondition: { [kay: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder as SortOrder;
  }
  const whereCondition: Prisma.RoomWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.room.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: sortCondition,
  });
  const total = await prisma.room.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Room | null> => {
  const result = await prisma.room.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const RoomService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
};
