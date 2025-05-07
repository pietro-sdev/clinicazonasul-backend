import { FastifyRequest, FastifyReply } from 'fastify'
import { ProdutoService } from '../service/produto-service'
import { z } from 'zod'

const schema = z.object({
  nome:          z.string(),
  dose:          z.string(),
  precoCaixa:    z.coerce.number().positive(),
  precoUnitario: z.coerce.number().positive(),
})

export const ProdutoController = {
  async list(_: FastifyRequest, reply: FastifyReply) {
    const result = await ProdutoService.list()
    reply.send(result)
  },

  async create(req: FastifyRequest, reply: FastifyReply) {
    const body = schema.parse(req.body)
    const produto = await ProdutoService.create(body)
    reply.status(201).send(produto)
  },

  async update(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string }
    const body = schema.partial().parse(req.body)
    const produto = await ProdutoService.update(id, body)
    reply.send(produto)
  },

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string }
    await ProdutoService.delete(id)
    reply.status(204).send()
  },
}
