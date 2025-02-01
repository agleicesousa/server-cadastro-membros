import { PostgresDataSource } from '../config/database.config';
import { Address } from '../entities/address.entity';
import ErrorHandler from '../errors/handler.error';

export class AddressService {
  private addressRepository = PostgresDataSource.getRepository(Address);

  private async startDatabase(): Promise<void> {
    if (!PostgresDataSource.isInitialized) {
      await PostgresDataSource.initialize();
    }
  }

  async createAddress(dataAddress: Address): Promise<Address> {
    await this.startDatabase();

    const newAddress = this.addressRepository.create(dataAddress);

    try {
      await this.addressRepository.save(newAddress);
      return newAddress;
    } catch (error) {
      console.error('Erro ao salvar o novo endereço:', error);
      throw ErrorHandler.internalServerError(
        'Não foi possível salvar o novo endereço.'
      );
    }
  }

  async getAddresses(): Promise<Address[]> {
    try {
      await this.startDatabase();
      return this.addressRepository.find();
    } catch (error) {
      console.error('Erro ao listar os endereços:', error);
      throw ErrorHandler.internalServerError(
        'Não foi possível listar os endereços.'
      );
    }
  }

  async findAddressesBy(columnName: string, value: string): Promise<Address[]> {
    try {
      await this.startDatabase();
      const addresses = await this.addressRepository.find({
        where: { [columnName]: value }
      });
      return addresses;
    } catch (error) {
      console.error(
        'Erro ao buscar endereços pelo critério %s:',
        columnName,
        error
      );
      throw ErrorHandler.internalServerError(
        `Não foi possível buscar endereços pelo critério ${columnName}.`
      );
    }
  }
}
