import { Request, Response } from 'express';
import { MemberService } from '../services/member.service';
import ErrorHandler from '../errors/handler.error';

export class MemberController {
  private memberService = new MemberService();

  async createMember(req: Request, res: Response): Promise<Response> {
    try {
      const dataMember = req.body;
      const newMember = await this.memberService.createMember(dataMember);
      return res.status(201).json({
        message: 'Membro criado com sucesso',
        data: newMember
      });
    } catch (error) {
      const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
      return res.status(statusCode).json({
        message: 'Algo deu errado. Por favor, tente novamente mais tarde.'
      });
    }
  }

  async getMembers(_req: Request, res: Response): Promise<Response> {
    try {
      const members = await this.memberService.getMembers();
      return res.status(200).json({
        message: 'Membros listados com sucesso',
        data: members
      });
    } catch (error) {
      const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
      return res.status(statusCode).json({
        message: 'Algo deu errado. Por favor, tente novamente mais tarde.'
      });
    }
  }
}
