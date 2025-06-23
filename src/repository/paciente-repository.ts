  import { prisma } from '../prisma/client.js';
  
  export const PacienteRepository = {
    async create(data: any) {
      return prisma.paciente.create({ data });
    },

    async findMany(page: number, perPage: number) {
      return prisma.paciente.findMany({
        skip:  (page - 1) * perPage,
        take:  perPage,
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
      })
    },
  
    async count() {
      return prisma.paciente.count()
    },
  
    async findById(id: string) {
      return prisma.paciente.findUnique({ where: { id } });
    },
  
    async update(id: string, data: any) {
      return prisma.paciente.update({ where: { id }, data });
    },
  
    async delete(id: string) {
      return prisma.paciente.delete({ where: { id } });
    },
  };