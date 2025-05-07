import { prisma } from '../prisma/client';
export const VacinaRepository = {
    create(data) {
        return prisma.vacina.create({ data });
    },
    listByPaciente(pacienteId) {
        return prisma.vacina.findMany({
            where: { pacienteId },
            orderBy: { dataAplicacao: 'desc' },
        });
    },
};
