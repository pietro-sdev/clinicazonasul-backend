import { FastifyInstance } from 'fastify'
import { VacinaController } from '../controller/vacina-controller'

export async function vacinaRoutes(app: FastifyInstance) {
  app.post('/pacientes/:pacienteId/vacinas', VacinaController.create)
  app.get('/pacientes/:pacienteId/vacinas', VacinaController.list)
}
