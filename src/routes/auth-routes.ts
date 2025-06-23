import { FastifyInstance } from 'fastify'
import { AuthController } from '../controller/auth-controller.js'

export async function authRoutes(app: FastifyInstance) {
  app.post('/login', AuthController.login)
}
