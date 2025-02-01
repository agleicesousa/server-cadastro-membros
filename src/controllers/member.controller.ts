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
        message: 'Membro criado com sucesso!',
        data: newMember
      });
    } catch (error) {
      const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
      return res.status(statusCode).json({
        message:
          'Houve um problema ao criar o membro. Tente novamente mais tarde.'
      });
    }
  }

  async getMembers(_req: Request, res: Response): Promise<Response> {
    try {
      const members = await this.memberService.getMembers();
      return res.status(200).json({
        message: 'Lista de membros obtida com êxito.',
        data: members
      });
    } catch (error) {
      const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
      return res.status(statusCode).json({
        message:
          error instanceof ErrorHandler
            ? error.message
            : 'Não foi possível obter a lista de membros no momento. Por favor, tente mais tarde.'
      });
    }
  }

  async findMembersBy(req: Request, res: Response): Promise<Response> {
    try {
      const { columnName, value } = req.params;
      const members = await this.memberService.findMembersBy(columnName, value);

      return res.status(200).json({
        message: 'Membros encontrados com sucesso.',
        data: members
      });
    } catch (error) {
      console.error('Erro ao buscar membros:', error);

      const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
      return res.status(statusCode).json({
        message:
          error instanceof ErrorHandler
            ? error.message
            : 'Ocorreu um erro ao buscar os membros. Por favor, tente novamente mais tarde.'
      });
    }
  }

  async updateMember(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const dataMember = req.body;
      const updatedMember = await this.memberService.updateMember(
        Number(id),
        dataMember
      );
      return res.status(200).json({
        message: 'Membro atualizado com êxito.',
        data: updatedMember
      });
    } catch (error) {
      const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
      return res.status(statusCode).json({
        message:
          error instanceof ErrorHandler
            ? error.message
            : 'Não foi possível atualizar o membro. Tente novamente mais tarde.'
      });
    }
  }

  async deleteMember(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.memberService.deleteMember(Number(id));
      return res.status(200).json({
        message: 'Membro removido com sucesso.'
      });
    } catch (error) {
      const statusCode = error instanceof ErrorHandler ? error.statusCode : 500;
      const message =
        error instanceof ErrorHandler && error.statusCode === 404
          ? error.message
          : 'Erro ao remover o membro. Por favor, tente novamente mais tarde.';

      return res.status(statusCode).json({
        message: message
      });
    }
  }
}
