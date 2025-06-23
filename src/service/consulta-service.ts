import { ConsultaRepository } from '../repository/consulta-repository.js'

export const ConsultaService = {
  async addConsulta(pacienteId: string, payload: {
    descricao: string
    dataHora: Date
    diagnostico: string
    observacao?: string | null
  }) {
    return ConsultaRepository.create(pacienteId, payload)
  },

  async listPorPaciente(pacienteId: string) {
    return ConsultaRepository.findByPaciente(pacienteId)
  },
}
