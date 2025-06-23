// src/controller/auth-controller.ts
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { AuthService } from '../service/auth-service'
import { UserService } from '../service/user-service'

/**
 * Configurações de cookie usadas em todo o controller
 */
const COOKIE_OPTIONS = {
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // HTTPS obrigatório se production
  sameSite: 'none' as const,                     // permite cross-site (Render ⇄ Vercel)
  maxAge: 60 * 60 * 24 * 7,                     // 7 dias (em segundos)
}

export const AuthController = {
  /**
   * POST /login
   * Body: { email, password }
   * Response: { user }
   * Cookie: token
   */
  async login(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })

    const credentials = bodySchema.parse(request.body)

    try {
      const { user, token } = await AuthService.login(credentials)

      reply
        .setCookie('token', token, COOKIE_OPTIONS)
        .status(200)
        .send({ user })
    } catch (error: any) {
      reply.status(401).send({ message: error.message || 'Invalid credentials' })
    }
  },

  /**
   * POST /logout
   * Remove o cookie
   */
  async logout(_request: FastifyRequest, reply: FastifyReply) {
    reply
      .clearCookie('token', { path: '/' })
      .status(200)
      .send({ message: 'Logged out successfully' })
  },

  /**
   * GET /me
   * Precisa do cookie token
   */
  async me(request: FastifyRequest, reply: FastifyReply) {
    const token = request.cookies.token
    if (!token) return reply.status(401).send({ message: 'Unauthorized' })

    try {
      const user = await UserService.getAuthenticatedUser(token)
      reply.send(user)
    } catch (error: any) {
      reply.status(401).send({ message: error.message || 'Unauthorized' })
    }
  }
}
