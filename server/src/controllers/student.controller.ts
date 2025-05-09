import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../../prisma/prisma-client';
import { AuthRequest } from '../types';
import { log } from '../utils/logger';
import { Prisma } from '@prisma/client';

export const createStudent = async (req: Request, res: Response) => {
  try {
    const {
      names,
      email,
      gender,
      telephone,
      password,
      level: studentClass,
      score,
      major,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        names,
        email,
        telephone,
        password: hashedPassword,
        gender,
        role: 'STUDENT',
        student: {
          create: {
            level: studentClass,
            major,
            score,
          },
        },
      },
      include: { student: true },
    });

    log(`Student created: ${newUser.id} (${newUser.email})`);
    res.status(201).json({
      success: true,
      data: newUser,
      message: 'Student created successfully',
    });
  } catch (error) {
    log(`Failed to create student: ${error}`);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const target = error.meta?.target as string[] | undefined;
        const key = target?.[0];
        const value = key ? req.body[key] : '';
        const friendlyKey = key
          ? key.charAt(0).toUpperCase() + key.slice(1)
          : 'Field';
        return res.status(400).json({
          success: false,
          message: `${friendlyKey} (${value}) already exists`,
        });
      }
    }

    res.status(500).json({
      success: false,
      error: 'Failed to create student',
      details: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

export const getAllStudents = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string);
  const limit = parseInt(req.query.limit as string);

  try {
    if (!page || !limit) {
      const students = await prisma.student.findMany({
        include: { user: true },
      });
      log(`Fetched all students (no pagination)`);
      return res.json({
        success: true,
        data: students,
      });
    }

    const skip = (page - 1) * limit;

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        skip,
        take: limit,
        include: { user: true },
      }),
      prisma.student.count(),
    ]);

    log(`Fetched students page ${page} with limit ${limit}`);
    return res.json({
      success: true,
      data: students,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    log(`Failed to fetch students: ${error}`);
    res.status(500).json({
      success: false,
      error: 'Failed to get students',
    });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!student) {
      log(`Student not found with ID: ${id}`);
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    log(`Fetched student ID: ${id}`);
    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    log(`Error fetching student ID ${id}: ${error}`);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { level: studentClass, score, major } = req.body;

  try {
    const existingStudent = await prisma.student.findUnique({
      where: { id },
    });

    if (!existingStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    const updatedStudent = await prisma.student.update({
      where: { id },
      data: { level: studentClass, major, score },
    });

    log(`Updated student ID: ${id}`);
    res.json({
      success: true,
      data: updatedStudent,
      message: 'Student updated successfully',
    });
  } catch (error) {
    log(`Failed to update student ID ${id}: ${error}`);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          message: 'Student not found',
        });
      }
    }

    res.status(500).json({
      success: false,
      error: 'Failed to update student',
      details: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.student.delete({ where: { id } });
    log(`Deleted student ID: ${id}`);
    res.json({
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (error) {
    log(`Failed to delete student ID ${id}: ${error}`);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return res.status(404).json({
          success: false,
          message: 'Student not found',
        });
      }
    }

    res.status(500).json({
      success: false,
      error: 'Failed to delete student',
      details: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const profile = await prisma.user.findUnique({
      where: { id: userId },
      include: { student: true },
    });

    if (!profile) {
      log(`Profile not found for user ID: ${userId}`);
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      });
    }

    log(`Fetched profile for user ID: ${userId}`);
    res.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    log(`Failed to fetch profile for user ID ${req.user?.id}: ${error}`);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch profile',
      details: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};
