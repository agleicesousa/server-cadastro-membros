import { Request, Response } from 'express';
import { AddressService } from '../services/address.service';
import ErrorHandler from '../errors/handler.error';

export class AddressController {
  private addressService = new AddressService();

  async createAddress(req: Request, res: Response): Promise<Response> {
    try {
      const dataAddress = req.body;
      const newAddress = await this.addressService.createAddress(dataAddress);
      return res.status(201).json({
        message: 'Endereço criado com sucesso!',
        data: newAddress
      });
    } catch (error) {
      const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
      return res.status(statusCode).json({
        message:
          'Houve um problema ao criar o endereço. Tente novamente mais tarde.'
      });
    }
  }

  async getAddresses(_req: Request, res: Response): Promise<Response> {
    try {
      const addresses = await this.addressService.getAddresses();
      return res.status(200).json({
        message: 'Lista de endereços obtida com êxito.',
        data: addresses
      });
    } catch (error) {
      const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
      return res.status(statusCode).json({
        message:
          'Não foi possível obter a lista de endereços no momento. Por favor, tente mais tarde.'
      });
    }
  }

  async findAddressesBy(req: Request, res: Response): Promise<Response> {
    try {
      const { columnName, value } = req.params;
      const addresses = await this.addressService.findAddressesBy(
        columnName,
        value
      );
      return res.status(200).json({
        message: 'Endereços encontrados com sucesso.',
        data: addresses
      });
    } catch (error) {
      const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
      return res.status(statusCode).json({
        message:
          error instanceof ErrorHandler
            ? error.message
            : 'Ocorreu um erro ao buscar os endereços. Por favor, tente novamente mais tarde.'
      });
    }
  }

  async updateAddress(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const dataAddress = req.body;
      const updatedAddress = await this.addressService.updateAddress(
        Number(id),
        dataAddress
      );
      return res.status(200).json({
        message: 'Endereço atualizado com êxito.',
        data: updatedAddress
      });
    } catch (error) {
      const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
      return res.status(statusCode).json({
        message:
          error instanceof ErrorHandler
            ? error.message
            : 'Houve um problema ao atualizar o endereço. Tente novamente mais tarde.'
      });
    }
  }

  async deleteAddress(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.addressService.deleteAddress(Number(id));

      return res.status(200).json({
        message: 'Endereço removido com sucesso.'
      });
    } catch (error) {
      const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
      return res.status(statusCode).json({
        message:
          'Erro ao remover o endereço. Por favor, tente novamente mais tarde.'
      });
    }
  }
}
