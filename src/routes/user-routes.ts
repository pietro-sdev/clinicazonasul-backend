import { FastifyInstance } from 'fastify'
import { UserController } from '../controller/user-controller.js'

export async function userRoutes(app: FastifyInstance) {
  app.get('/me', UserController.me)
  app.post('/users/change-password', UserController.changePassword)
}
