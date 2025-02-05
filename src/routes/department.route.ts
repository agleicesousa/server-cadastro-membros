import { Router } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import { DepartmentController } from '../controllers/department.controller';

const departmentRoute = Router();
const departmentController = new DepartmentController();

departmentRoute.post(
  '/',
  asyncHandler((req, res) => departmentController.createDepartment(req, res))
);

departmentRoute.get(
  '/',
  asyncHandler((req, res) => departmentController.getDepartments(req, res))
);

export default departmentRoute;
