import { Router } from 'express';
import {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
  getStudentById,
} from '../controllers/student.controller';
import { validationMiddleware } from '../middlewares/validator.middleare';
import { CreateStudentDto, UpdateStudentDto } from '../dtos/student.dto';
import { checkAdmin } from '../middlewares/auth.middleware';

const studentRouter = Router();

studentRouter.use(checkAdmin);
studentRouter.post('/', validationMiddleware(CreateStudentDto), createStudent);
studentRouter.get('/', getAllStudents);
studentRouter.get('/:id', getStudentById);
studentRouter.put(
  '/:id',
  validationMiddleware(UpdateStudentDto),
  updateStudent
);
studentRouter.delete('/:id', deleteStudent);

export default studentRouter;
