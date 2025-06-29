import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { VacinaService } from '../service/vacina-service.js'

const bodySchema = z.object({
  nome:          z.string(),
  dose:          z.string(),
  dataAplicacao: z.string().transform((s) => new Date(s)),
  validade:      z.string().transform((s) => s ? new Date(s) : null).nullable().optional(),
  observacao:    z.string().optional(),
})

export const VacinaController = {
  async create(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { pacienteId } = req.params as { pacienteId: string }
      const data = bodySchema.parse(req.body)

      const vacina = await VacinaService.createVacina({ pacienteId, ...data })
      return reply.code(201).send(vacina)
    } catch (err: any) {
      req.log.error(err)
      return reply.code(400).send({ message: err.message })
    }
  },

  async list (req: FastifyRequest, reply: FastifyReply) {
    try {
      const { pacienteId } = req.params as { pacienteId: string }
      const vacinas = await VacinaService.listByPaciente(pacienteId)
      return reply.send(vacinas)
    } catch (err: any) {
      req.log.error(err)
      return reply.code(400).send({ message: err.message })
    }
  },
}
