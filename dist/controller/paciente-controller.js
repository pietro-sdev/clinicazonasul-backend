import { PacienteService } from '../service/paciente-service';
import { z } from 'zod';
const createSchema = z.object({
    nomeAnimal: z.string(),
    nomeTutor: z.string(),
    raca: z.string(),
    especie: z.string(),
    dataNascimento: z.string(),
    idade: z.coerce.number(),
    peso: z.coerce.number(),
    cep: z.string(),
    estado: z.string(),
    rua: z.string(),
    bairro: z.string(),
    numero: z.string(),
    complemento: z.string().nullable().optional(),
    telefones: z.string().transform((s) => JSON.parse(s)),
    emails: z.string().transform((s) => JSON.parse(s)),
});
export const PacienteController = {
    async create(req, reply) {
        try {
            const textFields = {};
            let fileBuf;
            for await (const part of req.parts()) {
                if (part.type === 'file') {
                    if (part.fieldname === 'fotoPerfil') {
                        fileBuf = await part.toBuffer();
                    }
                    else {
                        await part.toBuffer(); // descarta arquivos desconhecidos
                    }
                }
                else {
                    textFields[part.fieldname] = part.value;
                }
            }
            const parsedBody = createSchema.parse(textFields);
            const paciente = await PacienteService.createPaciente(parsedBody, fileBuf);
            return reply.code(201).send(paciente);
        }
        catch (err) {
            req.log.error(err);
            return reply.code(400).send({ message: err.message });
        }
    },
    async list(request, reply) {
        // query ?page=1&perPage=10  (padrão: 1-20)
        const querySchema = z.object({
            page: z.coerce.number().min(1).default(1),
            perPage: z.coerce.number().min(1).max(50).default(20),
        });
        const { page, perPage } = querySchema.parse(request.query);
        const result = await PacienteService.listPacientes(page, perPage);
        return reply.send(result); // { items, page, totalPages }
    },
    async getById(request, reply) {
        const { id } = request.params;
        const paciente = await PacienteService.getPacienteById(id);
        return reply.send(paciente);
    },
    async update(request, reply) {
        const { id } = request.params;
        const data = createSchema.partial().parse(request.body);
        const paciente = await PacienteService.updatePaciente(id, data);
        return reply.send(paciente);
    },
    async delete(request, reply) {
        const { id } = request.params;
        await PacienteService.deletePaciente(id);
        return reply.status(204).send();
    }
};
