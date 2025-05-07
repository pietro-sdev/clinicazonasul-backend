import { FastifyInstance } from 'fastify'
import { PacienteController } from '../controller/paciente-controller'

export async function pacienteRoutes(fastify: FastifyInstance) {
  fastify.post('/pacientes', PacienteController.create)
  fastify.get('/pacientes', PacienteController.list)
  fastify.get('/pacientes/:id', PacienteController.getById)
  fastify.put('/pacientes/:id', PacienteController.update)
  fastify.delete('/pacientes/:id', PacienteController.delete)
}
