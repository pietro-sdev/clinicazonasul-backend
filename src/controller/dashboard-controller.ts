import { FastifyRequest, FastifyReply } from 'fastify'
import { DashboardService } from '../service/dashboard-service'
import { DashboardRepository } from '../repository/dashboard-repository'

const service = new DashboardService(new DashboardRepository())

export class DashboardController {
  static async getResumo(request: FastifyRequest, reply: FastifyReply) {
    const resumo = await service.obterResumo()
    return reply.send(resumo)
  }
}