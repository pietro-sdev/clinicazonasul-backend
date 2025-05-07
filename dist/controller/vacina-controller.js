import { z } from 'zod';
import { VacinaService } from '../service/vacina-service';
const bodySchema = z.object({
    nome: z.string(),
    dose: z.string(),
    dataAplicacao: z.string().transform((s) => new Date(s)),
    validade: z.string().transform((s) => s ? new Date(s) : null).nullable().optional(),
    observacao: z.string().optional(),
});
export const VacinaController = {
    async create(req, reply) {
        try {
            const { pacienteId } = req.params;
            const data = bodySchema.parse(req.body);
            const vacina = await VacinaService.createVacina({ pacienteId, ...data });
            return reply.code(201).send(vacina);
        }
        catch (err) {
            req.log.error(err);
            return reply.code(400).send({ message: err.message });
        }
    },
    async list(req, reply) {
        try {
            const { pacienteId } = req.params;
            const vacinas = await VacinaService.listByPaciente(pacienteId);
            return reply.send(vacinas);
        }
        catch (err) {
            req.log.error(err);
            return reply.code(400).send({ message: err.message });
        }
    },
};
