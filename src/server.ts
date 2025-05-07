import Fastify from 'fastify'
import cors from '@fastify/cors'
import cookie from '@fastify/cookie'
import multipart from '@fastify/multipart'
import dotenv from 'dotenv'
import { registerRoutes } from './routes'

dotenv.config()

const app = Fastify()

app.register(cors, {
  origin: true,
  credentials: true,
})

app.register(cookie, {
  secret: process.env.COOKIE_SECRET || 'default_cookie_secret',
  parseOptions: {
    sameSite: 'lax',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  },
})

app.register(multipart, {
  limits: { fileSize: 5 * 1024 * 1024 },
})

app.register(registerRoutes)

app.listen({ port: 3333, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`🚀 Servidor rodando em ${address}`)
})
