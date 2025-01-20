import { Request, Response } from 'express';
import { memberService } from '../services/member.service';
import ErrorHandler from '../errors/handler.error';

export class MemberController {
  private memberService = new memberService();

  async createMember(req: Request, res: Response) {
    try {
      const dataMember = req.body;
      const newMember = await this.memberService.createMember(dataMember);
      return res.status(201).json({
        message: 'Membro criado com sucesso',
        data: newMember
      });
    } catch (error) {
      const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
      res.status(statusCode).json({
        message: 'Algo deu errado. Por favor, tente novamente mais tarde.'
      });
    }
  }
}
