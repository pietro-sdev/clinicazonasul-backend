import Fastify from 'fastify'
import cors from '@fastify/cors'
import cookie from '@fastify/cookie'
import multipart from '@fastify/multipart'
import dotenv from 'dotenv'
import { registerRoutes } from './routes/index.js'

dotenv.config()

const app = Fastify()

app.register(cors, {
  origin: [
    'https://clinicazonasul-frontend.vercel.app',
    'http://localhost:3000',
  ],
  credentials: true,
})

app.register(cookie /*, { secret: '…' } */)   // sem parseOptions aqui
app.register(multipart, { limits: { fileSize: 5 * 1024 * 1024 } })

app.register(registerRoutes)

app.listen({ port: 3333, host:'0.0.0.0' }, err => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('🚀 Servidor rodando em http://localhost:3333')
})
