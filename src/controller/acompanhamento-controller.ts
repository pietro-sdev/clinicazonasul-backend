import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { AcompanhamentoRepository } from '../repository/acompanhamento-repository'
import { AcompanhamentoService } from '../service/acompanhamento-service'

const repo = new AcompanhamentoRepository()
const service = new AcompanhamentoService(repo)

export class AcompanhamentoController {
  static async create(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      pacienteId: z.string().uuid(),
    })

    const bodySchema = z.object({
      descricao: z.string().min(1),
      dataHora: z.string().datetime(),
      diagnostico: z.string().min(1),
      observacao: z.string().optional(),
    })

    const { pacienteId } = paramsSchema.parse(request.params)
    const { descricao, dataHora, diagnostico, observacao } = bodySchema.parse(request.body)

    const acompanhamento = await service.create({
      descricao,
      dataHora: new Date(dataHora),
      diagnostico,
      observacao: observacao || null,
      pacienteId,
    })

    return reply.status(201).send(acompanhamento)
  }

  static async list(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      pacienteId: z.string().uuid(),
    })

    const { pacienteId } = paramsSchema.parse(request.params)
    const acompanhamentos = await service.listByPaciente(pacienteId)
    return reply.send(acompanhamentos)
  }
}
