import { PostgresDataSource } from '../config/database.config';
import { Member } from '../entities/member.entity';
import ErrorHandler from '../errors/handler.error';

export class memberService {
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
}
