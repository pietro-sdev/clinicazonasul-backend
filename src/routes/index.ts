import { FastifyInstance } from 'fastify'
import { authRoutes } from './auth-routes.js'
import { userRoutes } from './user-routes.js'
import { pacienteRoutes } from './paciente-routes.js'
import { produtoRoutes } from './produto-routes.js'
import { userPhotoRoutes } from './user-photo-routes.js'
import { vacinaRoutes } from './vacina-routes.js'
import { consultaRoutes } from './consulta-routes.js'
import { acompanhamentoRoutes } from './acompanhamento-routes.js'
import { dashboardRoutes } from './dashboard-routes.js'

export async function registerRoutes(app: FastifyInstance) {
  app.register(authRoutes)
  app.register(userRoutes)
  app.register(pacienteRoutes)
  app.register(produtoRoutes)
  app.register(userPhotoRoutes)
  app.register(vacinaRoutes)
  app.register(consultaRoutes)
  app.register(acompanhamentoRoutes)
  app.register(dashboardRoutes)
}
