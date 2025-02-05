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
}
