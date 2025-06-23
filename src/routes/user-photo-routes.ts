import { FastifyInstance } from 'fastify'
import { UserPhotoController } from '../controller/user-photo-controller.js'

export async function userPhotoRoutes(app: FastifyInstance) {
  app.post('/users/photo', UserPhotoController.upload)
}
