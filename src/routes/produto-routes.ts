import { ProdutoController } from '../controller/produto-controller'
import { FastifyInstance } from 'fastify'

export async function produtoRoutes(fastify: FastifyInstance) {
fastify.get('/produtos',        ProdutoController.list)
fastify.post('/produtos',       ProdutoController.create)
fastify.put('/produtos/:id',    ProdutoController.update)
fastify.delete('/produtos/:id', ProdutoController.delete)
}
