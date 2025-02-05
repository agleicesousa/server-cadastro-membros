import { PostgresDataSource } from '../config/database.config';
import { Department } from '../entities/department.entity';
import ErrorHandler from '../errors/handler.error';

export class DepartmentService {
  private departmentRepository = PostgresDataSource.getRepository(Department);

  private async startDatabase(): Promise<void> {
    if (!PostgresDataSource.isInitialized) {
      await PostgresDataSource.initialize();
    }
  }

  async createDepartment(dataDepartment: Department): Promise<Department> {
    await this.startDatabase();

    const newDepartment = this.departmentRepository.create(dataDepartment);

    try {
      await this.departmentRepository.save(newDepartment);
      return newDepartment;
    } catch (error) {
      console.error('Erro ao salvar o novo departamento:', error);
      throw ErrorHandler.internalServerError(
        'Não foi possível salvar o novo departamento.'
      );
    }
  }

  async getDepartments(): Promise<Department[]> {
    try {
      await this.startDatabase();
      const departments = await this.departmentRepository.find();

      if (departments.length === 0) {
        throw ErrorHandler.notFound('Nenhum departamento cadastrado.');
      }

      return departments;
    } catch (error) {
      console.error('Erro ao listar os departamentos:', error);

        if (error instanceof ErrorHandler && error.statusCode === 404) {
          throw error;
        }

      throw ErrorHandler.internalServerError(
        'Não foi possível listar os departamentos.'
      );
    }
  }
}
