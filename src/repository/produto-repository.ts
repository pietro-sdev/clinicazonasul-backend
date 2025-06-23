import { prisma } from '../prisma/client.js'

export const ProdutoRepository = {
  list() {
    return prisma.produto.findMany({ orderBy: { nome: 'asc' } })
  },
  create(data: any) {
    return prisma.produto.create({ data })
  },
  update(id: string, data: any) {
    return prisma.produto.update({ where: { id }, data })
  },
  delete(id: string) {
    return prisma.produto.delete({ where: { id } })
  },
}
