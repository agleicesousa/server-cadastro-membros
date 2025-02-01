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

      if (addresses.length === 0) {
        throw ErrorHandler.notFound(
          `Nenhum endereço encontrado com o critério ${columnName} = ${value}.`
        );
      }

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

  async updateAddress(id: number, dataAddress: Partial<Address>): Promise<Address> {
    await this.startDatabase();
    const address = await this.addressRepository.findOneBy({ id });

    if (!address) {
      throw ErrorHandler.notFound('Endereço não encontrado.');
    }

    Object.assign(address, dataAddress);
    try {
      return this.addressRepository.save(address);
    } catch (error) {
      console.error('Erro ao atualizar o endereço:', error);
      throw ErrorHandler.internalServerError(
        'Não foi possível atualizar o endereço.'
      );
    }
  }

  async deleteAddress(id: number): Promise<void> {
    await this.startDatabase();
    const address = await this.addressRepository.findOneBy({ id });

    if (!address) {
      throw ErrorHandler.notFound('Endereço não encontrado.');
    }

    try {
      await this.addressRepository.remove(address);

    } catch (error) {
      console.error('Erro ao deletar o endereço:', error);
      throw ErrorHandler.internalServerError(
        ' Não foi possível deletar o endereço.'
      );
    }
  }
}
