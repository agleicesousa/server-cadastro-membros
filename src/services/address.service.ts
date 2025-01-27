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
}
