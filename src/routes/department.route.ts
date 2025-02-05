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

departmentRoute.get(
  '/:columnName/:value',
  asyncHandler((req, res) => departmentController.findDepartmentsBy(req, res))
);

departmentRoute.put(
  '/:id',
  asyncHandler((req, res) => departmentController.updateDepartment(req, res))
);

departmentRoute.delete(
  '/:id',
  asyncHandler((req, res) => departmentController.deleteDepartment(req, res))
);

export default departmentRoute;
