import { FastifyRequest, FastifyReply } from 'fastify'
import { UserService } from '../service/user-service'
import { z } from 'zod'
import jwt from 'jsonwebtoken'

export const UserController = {
  async me(request: FastifyRequest, reply: FastifyReply) {
    const token = request.cookies.token

    if (!token) {
      return reply.status(401).send({ message: 'Token not provided' })
    }

    try {
      const user = await UserService.getAuthenticatedUser(token)
      return reply.send(user)
    } catch (err: any) {
      return reply.status(401).send({ message: err.message || 'Unauthorized' })
    }
  },

  async changePassword(request: FastifyRequest, reply: FastifyReply) {
    const schema = z.object({
      currentPassword: z.string().min(6),
      newPassword: z.string().min(6),
    })

    const token = request.cookies.token
    if (!token) return reply.status(401).send({ message: 'Unauthorized' })

    const body = schema.parse(request.body)

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }

      await UserService.changePassword(decoded.id, body.currentPassword, body.newPassword)
      return reply.send({ message: 'Password updated successfully' })
    } catch (err: any) {
      return reply.status(400).send({ message: err.message || 'Error updating password' })
    }
  }
}
