import { prisma } from '../prisma/client'

export const ConsultaRepository = {
  async create(pacienteId: string, data: {
    descricao: string
    dataHora: Date
    diagnostico: string
    observacao?: string | null
  }) {
    return prisma.consulta.create({
      data: {
        pacienteId,
        ...data,
      },
    })
  },

  async findByPaciente(pacienteId: string) {
    return prisma.consulta.findMany({
      where: { pacienteId },
      orderBy: { dataHora: 'desc' },
    })
  },
}
