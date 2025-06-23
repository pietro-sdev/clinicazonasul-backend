import { prisma } from '../prisma/client.js'
import { Acompanhamento } from '../model/Acompanhamento.js'
import { CreateAcompanhamentoInput } from '../service/acompanhamento-service.js'

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
