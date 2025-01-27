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
}
