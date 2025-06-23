import { prisma } from '../prisma/client.js'
import { DashboardSummary } from '../model/Dashboard.js'

export class DashboardRepository {
  async getResumo(): Promise<DashboardSummary> {
    const hoje = new Date()
    const inicioDoDia = new Date(hoje.setHours(0, 0, 0, 0))
    const fimDoDia = new Date(hoje.setHours(23, 59, 59, 999))

    const [totalPacientes, consultasHoje, vacinasAplicadas] = await Promise.all([
      prisma.paciente.count(),
      prisma.consulta.count({
        where: {
          dataHora: {
            gte: inicioDoDia,
            lte: fimDoDia,
          },
        },
      }),
      prisma.vacina.count(),
    ])

    return {
      totalPacientes,
      consultasHoje,
      vacinasAplicadas,
    }
  }
}