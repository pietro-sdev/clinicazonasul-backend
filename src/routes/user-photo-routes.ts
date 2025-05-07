import { FastifyInstance } from 'fastify'
import { UserPhotoController } from '../controller/user-photo-controller'

export async function userPhotoRoutes(app: FastifyInstance) {
  app.post('/users/photo', UserPhotoController.upload)
}
