import { prisma } from '../prisma/client';
export const PacienteRepository = {
    async create(data) {
        return prisma.paciente.create({ data });
    },
    async findMany(page, perPage) {
        return prisma.paciente.findMany({
            skip: (page - 1) * perPage,
            take: perPage,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                nomeAnimal: true,
                nomeTutor: true,
                raca: true,
                idade: true,
                peso: true,
                fotoPerfil: true,
            },
        });
    },
    async count() {
        return prisma.paciente.count();
    },
    async findById(id) {
        return prisma.paciente.findUnique({ where: { id } });
    },
    async update(id, data) {
        return prisma.paciente.update({ where: { id }, data });
    },
    async delete(id) {
        return prisma.paciente.delete({ where: { id } });
    },
};
