export interface Acompanhamento {
  id: string
  descricao: string
  dataHora: Date
  diagnostico: string
  observacao: string | null
  pacienteId: string
  createdAt: Date
  updatedAt: Date
}
