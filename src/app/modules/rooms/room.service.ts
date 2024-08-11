import { Room } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Room): Promise<Room> => {
  const result = await prisma.room.create({ data });
  return result;
};

export const RoomService = {
  insertIntoDB,
};
