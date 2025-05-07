import { prisma } from '../prisma/client';
export class DashboardRepository {
    async getResumo() {
        const hoje = new Date();
        const inicioDoDia = new Date(hoje.setHours(0, 0, 0, 0));
        const fimDoDia = new Date(hoje.setHours(23, 59, 59, 999));
        const [totalPacientes, consultasHoje, vacinasAplicadas] = await Promise.all([
            prisma.paciente.count(),
            prisma.consulta.count({
                where: {
                    dataHora: {
                        gte: inicioDoDia,
                        lte: fimDoDia,
                    },
                },
            }),
            prisma.vacina.count(),
        ]);
        return {
            totalPacientes,
            consultasHoje,
            vacinasAplicadas,
        };
    }
}
