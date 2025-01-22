import { PostgresDataSource } from '../config/database.config';
import { Member } from '../entities/member.entity';
import ErrorHandler from '../errors/handler.error';

export class MemberService {
  private memberRepository = PostgresDataSource.getRepository(Member);

  private async startDatabase(): Promise<void> {
    if (!PostgresDataSource.isInitialized) {
      await PostgresDataSource.initialize();
    }
  }

  async createMember(dataMember: Member): Promise<Member> {
    await this.startDatabase();

    const newMember = this.memberRepository.create(dataMember);

    try {
      await this.memberRepository.save(newMember);
      return newMember;
    } catch (error) {
      console.error('Erro ao salvar novo membro:', error);
      throw ErrorHandler.internalServerError('Erro ao salvar novo membro.');
    }
  }

  async getMembers(): Promise<Member[]> {
    try {
      await this.startDatabase();
      return this.memberRepository.find();
    } catch (error) {
      console.error('Erro ao listar membros:', error);
      throw ErrorHandler.internalServerError('Erro ao listar membros.');
    }
  }

  async findMembersBy(columnName: string, value: string): Promise<Member[]> {
    try {
      await this.startDatabase();
      const members = await this.memberRepository.find({
        where: { [columnName]: value }
      });
      return members;
    } catch (error) {
      console.error(`Erro ao buscar membro por ${columnName}:`, error);
      throw ErrorHandler.internalServerError(
        `Erro ao buscar membro por ${columnName}.`
      );
    }
  }

  async updateMember(id: number, dataMember: Member): Promise<Member> {
    try {
      await this.startDatabase();
      const member = await this.memberRepository.findOneBy({ id });
      if (!member) {
        throw ErrorHandler.notFound(`Membro não encontrado.`);
      }
      Object.assign(member, dataMember);
      return this.memberRepository.save(member);
    } catch (error) {
      console.error(`Erro ao atualizar membro:`, error);
      throw ErrorHandler.internalServerError(`Erro ao atualizar membro.`);
    }
  }

  async deleteMember(id: number): Promise<void> {
    try {
      await this.startDatabase();
      const member = await this.memberRepository.findOneBy({ id });
      if (!member) {
        throw ErrorHandler.notFound(`Membro não encontrado.`);
      }
      await this.memberRepository.remove(member);
    } catch (error) {
      console.error(`Erro ao deletar membro:`, error);
      throw ErrorHandler.internalServerError(`Erro ao deletar membro.`);
    }
  }
}
