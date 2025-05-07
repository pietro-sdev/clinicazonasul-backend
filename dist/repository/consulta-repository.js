import { prisma } from '../prisma/client';
export const ConsultaRepository = {
    async create(pacienteId, data) {
        return prisma.consulta.create({
            data: {
                pacienteId,
                ...data,
            },
        });
    },
    async findByPaciente(pacienteId) {
        return prisma.consulta.findMany({
            where: { pacienteId },
            orderBy: { dataHora: 'desc' },
        });
    },
};
