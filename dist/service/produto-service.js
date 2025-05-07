import { ProdutoRepository } from '../repository/produto-repository';
export const ProdutoService = {
    list() {
        return ProdutoRepository.list();
    },
    create(data) {
        return ProdutoRepository.create(data);
    },
    update(id, data) {
        return ProdutoRepository.update(id, data);
    },
    delete(id) {
        return ProdutoRepository.delete(id);
    },
};
