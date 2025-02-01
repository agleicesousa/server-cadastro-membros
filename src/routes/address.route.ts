import { Router } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import { AddressController } from '../controllers/address.controller';

const addressRoute = Router();
const addressController = new AddressController();

addressRoute.post(
  '/',
  asyncHandler((req, res) => addressController.createAddress(req, res))
);

addressRoute.get(
  '/',
  asyncHandler((req, res) => addressController.getAddresses(req, res))
);

addressRoute.get(
  '/:columnName/:value',
  asyncHandler((req, res) => addressController.findAddressesBy(req, res))
);

addressRoute.put(
  '/:id',
  asyncHandler((req, res) => addressController.updateAddress(req, res))
);

export default addressRoute;
