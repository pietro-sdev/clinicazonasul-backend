import { prisma } from '../prisma/client';
export const ProdutoRepository = {
    list() {
        return prisma.produto.findMany({ orderBy: { nome: 'asc' } });
    },
    create(data) {
        return prisma.produto.create({ data });
    },
    update(id, data) {
        return prisma.produto.update({ where: { id }, data });
    },
    delete(id) {
        return prisma.produto.delete({ where: { id } });
    },
};
