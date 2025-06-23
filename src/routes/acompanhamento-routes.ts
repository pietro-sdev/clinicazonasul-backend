import { FastifyInstance } from 'fastify'
import { AcompanhamentoController } from '../controller/acompanhamento-controller.js'

export async function acompanhamentoRoutes(app: FastifyInstance) {
  app.post('/pacientes/:pacienteId/acompanhamentos', AcompanhamentoController.create)
  app.get('/pacientes/:pacienteId/acompanhamentos', AcompanhamentoController.list)
}
