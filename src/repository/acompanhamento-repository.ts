import { prisma } from '../prisma/client'
import { Acompanhamento } from '../model/Acompanhamento'
import { CreateAcompanhamentoInput } from '../service/acompanhamento-service'

export class AcompanhamentoRepository {
  async create(data: CreateAcompanhamentoInput): Promise<Acompanhamento> {
    return prisma.acompanhamento.create({ data })
  }

  async findByPaciente(pacienteId: string): Promise<Acompanhamento[]> {
    return prisma.acompanhamento.findMany({
      where: { pacienteId },
      orderBy: { dataHora: 'desc' },
    })
  }
}
