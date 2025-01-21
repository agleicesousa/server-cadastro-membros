import { Router } from 'express';
import { MemberController } from '../controllers/member.controller';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';

const memberRoute = Router();
const memberController = new MemberController();

memberRoute.post('/', asyncHandler((req, res) => memberController.createMember(req, res)));
memberRoute.get('/', asyncHandler((req, res) => memberController.getMembers(req, res)));

export default memberRoute;
