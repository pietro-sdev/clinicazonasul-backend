import { VacinaRepository } from '../repository/vacina-repository'
import { prisma } from '../prisma/client'

export const VacinaService = {
  async createVacina(data: {
    pacienteId: string
    nome: string
    dose: string
    dataAplicacao: Date
    validade?: Date | null
    observacao?: string
  }) {
    const exists = await prisma.paciente.count({ where: { id: data.pacienteId } })
    if (!exists) throw new Error('Paciente não encontrado')

    return VacinaRepository.create(data)
  },

  listByPaciente(pacienteId: string) {
    return VacinaRepository.listByPaciente(pacienteId)
  },
}
