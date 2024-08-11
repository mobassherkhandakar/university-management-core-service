import { Room } from '@prisma/client';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from '../../../shared/httpStatus';
import sendResponse from '../../../shared/sendResponse';
import { RoomService } from './room.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.insertIntoDB(req.body);
  sendResponse<Room>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room successfully inserted',
    data: result,
  });
});

export const RoomController = {
  insertIntoDB,
};
