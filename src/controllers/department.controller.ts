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

  async findDepartmentsBy(req: Request, res: Response): Promise<Response> {
    try {
      const { columnName, value } = req.params;
      const departments = await this.departmentService.findDepartmentsBy(
        columnName,
        value
      );
      return res.status(200).json({
        message: 'Departamentos encontrados com sucesso.',
        data: departments
      });
    } catch (error) {
      const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
      return res.status(statusCode).json({
        message:
          error instanceof ErrorHandler
            ? error.message
            : 'Ocorreu um erro ao buscar os departamentos. Por favor, tente novamente mais tarde,'
      });
    }
  }

  async updateDepartment(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const dataDepartment = req.body;
      const updatedDepartment = await this.departmentService.updateDepartment(
        Number(id),
        dataDepartment
      );
      return res.status(200).json({
        message: 'Departamento atualizado com êxito.',
        data: updatedDepartment
      });
    } catch (error) {
      const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
      return res.status(statusCode).json({
        message:
          error instanceof ErrorHandler
            ? error.message
            : 'Houve um problema ao atualizar o departamento. Tente novamente mais tarde.'
      });
    }
  }
}
