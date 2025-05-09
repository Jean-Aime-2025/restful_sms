import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { ApiError, BadRequestError, ConflictError, NotFoundError } from '../errors'

export const errorHandler = (
  err: Error | ApiError | Prisma.PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.stack);

  // Handle Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaErrors(err, res);
  }

  // Handle custom API errors
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Handle other errors
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};

function handlePrismaErrors(err: Prisma.PrismaClientKnownRequestError, res: Response) {
  switch (err.code) {
    case 'P2002':
      const target = err.meta?.target as string[];
      return res.status(409).json({
        success: false,
        message: `${target?.join(', ')} already exists`,
      });
    case 'P2001':
    case 'P2025':
      return res.status(404).json({
        success: false,
        message: 'Record not found',
      });
    case 'P2003':
      return res.status(400).json({
        success: false,
        message: 'Foreign key constraint failed',
      });
    case 'P2000':
      return res.status(400).json({
        success: false,
        message: 'Input data is too long',
      });
    case 'P2004':
      return res.status(400).json({
        success: false,
        message: 'Constraint failed on database',
      });
    case 'P2005':
      return res.status(400).json({
        success: false,
        message: 'Invalid field value',
      });
    case 'P2006':
      return res.status(400).json({
        success: false,
        message: 'Invalid field value',
      });
    default:
      return res.status(500).json({
        success: false,
        message: 'Database error occurred',
        code: err.code,
      });
  }
}