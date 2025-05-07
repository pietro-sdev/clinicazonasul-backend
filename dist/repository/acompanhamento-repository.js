import { prisma } from '../prisma/client';
export class AcompanhamentoRepository {
    async create(data) {
        return prisma.acompanhamento.create({ data });
    }
    async findByPaciente(pacienteId) {
        return prisma.acompanhamento.findMany({
            where: { pacienteId },
            orderBy: { dataHora: 'desc' },
        });
    }
}
