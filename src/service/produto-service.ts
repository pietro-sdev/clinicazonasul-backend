import { ProdutoRepository } from '../repository/produto-repository.js'

export const ProdutoService = {
  list() {
    return ProdutoRepository.list()
  },
  create(data: any) {
    return ProdutoRepository.create(data)
  },
  update(id: string, data: any) {
    return ProdutoRepository.update(id, data)
  },
  delete(id: string) {
    return ProdutoRepository.delete(id)
  },
}
