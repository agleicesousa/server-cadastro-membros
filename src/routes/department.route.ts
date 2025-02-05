import { Router } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import { DepartmentController } from '../controllers/department.controller';

const departmentRoute = Router();
const departmentController = new DepartmentController();

departmentRoute.post(
  '/',
  asyncHandler((req, res) => departmentController.createDepartment(req, res))
);

export default departmentRoute;
