// acompanhamento-service.ts
import { AcompanhamentoRepository } from '../repository/acompanhamento-repository.js'
import { Acompanhamento } from '../model/Acompanhamento.js'

export interface CreateAcompanhamentoInput {
  descricao: string
  dataHora: Date
  diagnostico: string
  observacao?: string | null
  pacienteId: string
}

export class AcompanhamentoService {
  constructor(private repo: AcompanhamentoRepository) {}

  async create(data: CreateAcompanhamentoInput): Promise<Acompanhamento> {
    return this.repo.create(data)
  }

  async listByPaciente(pacienteId: string): Promise<Acompanhamento[]> {
    return this.repo.findByPaciente(pacienteId)
  }
}
