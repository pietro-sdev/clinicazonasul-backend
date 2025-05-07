import { FastifyInstance } from 'fastify'
import { AuthController } from '../controller/auth-controller'

export async function authRoutes(app: FastifyInstance) {
  app.post('/login', AuthController.login)
}
