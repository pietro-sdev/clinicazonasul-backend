import { prisma } from '../prisma/client'

export const VacinaRepository = {
  create(data: {
    pacienteId: string
    nome: string
    dose: string
    dataAplicacao: Date
    validade?: Date | null
    observacao?: string
  }) {
    return prisma.vacina.create({ data })
  },

  listByPaciente(pacienteId: string) {
    return prisma.vacina.findMany({
      where: { pacienteId },
      orderBy: { dataAplicacao: 'desc' },
    })
  },
}
