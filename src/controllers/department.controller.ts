import { Request, Response } from 'express';
import { DepartmentService } from '../services/department.service';
import ErrorHandler from '../errors/handler.error';

export class DepartmentController {
  private departmentService = new DepartmentService();

  async createDepartment(req: Request, res: Response): Promise<Response> {
    try {
      const dataDepartment = req.body;
      const newDepartment =
        await this.departmentService.createDepartment(dataDepartment);
      return res.status(201).json({
        message: 'Departamento criado com sucesso!',
        data: newDepartment
      });
    } catch (error) {
      const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
      return res.status(statusCode).json({
        message:
          'Houve um problema ao criar o departamento. Tente novamente mais tarde.'
      });
    }
  }

  async getDepartments(_req: Request, res: Response): Promise<Response> {
    try {
      const departments = await this.departmentService.getDepartments();
      return res.status(200).json({
        message: 'Lista de departamentos obtida com êxito.',
        data: departments
      });
    } catch (error) {
      const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
      return res.status(statusCode).json({
        message:
          error instanceof ErrorHandler
            ? error.message
            : 'Nao foi possivel obter a lista de departamentos. Por favor, tente mais tarde.'
      });
    }
  }
}
