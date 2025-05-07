import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ConsultaService } from '../service/consulta-service'

const bodySchema = z.object({
  descricao:   z.string().min(1),
  dataHora: z.string().refine(s => !isNaN(Date.parse(s)), {
    message: 'Data inválida',
  }),    
  diagnostico: z.string().min(1),
  observacao:  z.string().optional().nullable(),
})

export const ConsultaController = {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const { pacienteId } = req.params as { pacienteId: string }

    try {
      const body = bodySchema.parse(req.body)

      const consulta = await ConsultaService.addConsulta(pacienteId, {
        descricao:  body.descricao,
        dataHora:   new Date(body.dataHora),
        diagnostico: body.diagnostico,
        observacao:  body.observacao ?? null,
      })

      return reply.code(201).send(consulta)
    } catch (err: any) {
      req.log.error(err)
      return reply.code(400).send({ message: err.message })
    }
  },

  async list(req: FastifyRequest) {
    const { pacienteId } = req.params as { pacienteId: string }
    return ConsultaService.listPorPaciente(pacienteId)
  },
}
