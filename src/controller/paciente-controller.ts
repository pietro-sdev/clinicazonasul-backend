import { FastifyRequest, FastifyReply } from 'fastify'
import { PacienteService } from '../service/paciente-service'
import { z } from 'zod'

const createSchema = z.object({
  nomeAnimal: z.string(),
  nomeTutor:  z.string(),
  raca:       z.string(),
  especie:    z.string(),
  dataNascimento: z.string(),
  idade:      z.coerce.number(),
  peso:       z.coerce.number(),
  cep:        z.string(),
  estado:     z.string(),
  rua:        z.string(),
  bairro:     z.string(),
  numero:     z.string(),
  complemento: z.string().nullable().optional(),
  telefones:  z.string().transform((s) => JSON.parse(s) as string[]),
  emails:     z.string().transform((s) => JSON.parse(s) as string[]),
})

export const PacienteController = {
  async create(req: FastifyRequest, reply: FastifyReply) {
    try {
      const textFields: Record<string, string> = {}
      let   fileBuf: Buffer | undefined

      for await (const part of req.parts()) {
        if (part.type === 'file') {
          if (part.fieldname === 'fotoPerfil') {
            fileBuf = await part.toBuffer()
          } else {
            await part.toBuffer() // descarta arquivos desconhecidos
          }
        } else {
          textFields[part.fieldname] = part.value as string
        }
      }

      const parsedBody = createSchema.parse(textFields)
      const paciente   = await PacienteService.createPaciente(parsedBody, fileBuf)

      return reply.code(201).send(paciente)
    } catch (err: any) {
      req.log.error(err)
      return reply.code(400).send({ message: err.message })
    }
  },

  async list(request: FastifyRequest, reply: FastifyReply) {
    // query ?page=1&perPage=10  (padrão: 1-20)
    const querySchema = z.object({
      page:    z.coerce.number().min(1).default(1),
      perPage: z.coerce.number().min(1).max(50).default(20),
    })
    const { page, perPage } = querySchema.parse(request.query)

    const result = await PacienteService.listPacientes(page, perPage)
    return reply.send(result)          // { items, page, totalPages }
  },

  async getById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }
    const paciente = await PacienteService.getPacienteById(id)
    return reply.send(paciente)
  },

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }
    const data = createSchema.partial().parse(request.body)
    const paciente = await PacienteService.updatePaciente(id, data)
    return reply.send(paciente)
  },

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }
    await PacienteService.deletePaciente(id)
    return reply.status(204).send()
  }
}
