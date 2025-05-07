import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { AuthService } from '../service/auth-service'

export const AuthController = {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6)
    })

    const data = bodySchema.parse(request.body)

    try {
      const { user, token } = await AuthService.login(data)

      reply.setCookie('token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 // 1 dia
      })

      return reply.send({ user })
    } catch (error: any) {
      return reply.status(401).send({ message: error.message })
    }
  }
}
