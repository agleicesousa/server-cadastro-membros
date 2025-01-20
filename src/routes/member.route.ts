import { Router } from 'express';
import { MemberController } from '../controllers/member.controller';

const memberRoute = Router();
const memberController = new MemberController();

memberRoute.post('/', (req, res) => memberController.createMember(req, res));

export default memberRoute;