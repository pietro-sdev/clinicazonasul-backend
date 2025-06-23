import { FastifyInstance } from 'fastify'
import { DashboardController } from '../controller/dashboard-controller.js'

export async function dashboardRoutes(app: FastifyInstance) {
  app.get('/dashboard/resumo', DashboardController.getResumo)
}