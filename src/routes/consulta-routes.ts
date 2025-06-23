import { FastifyInstance } from 'fastify'
import { ConsultaController } from '../controller/consulta-controller.js'

export async function consultaRoutes(app: FastifyInstance) {
  app.post('/pacientes/:pacienteId/consultas', ConsultaController.create)
  app.get('/pacientes/:pacienteId/consultas', ConsultaController.list)
}
