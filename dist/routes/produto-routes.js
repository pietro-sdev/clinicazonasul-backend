import { ProdutoController } from '../controller/produto-controller';
export async function produtoRoutes(fastify) {
    fastify.get('/produtos', ProdutoController.list);
    fastify.post('/produtos', ProdutoController.create);
    fastify.put('/produtos/:id', ProdutoController.update);
    fastify.delete('/produtos/:id', ProdutoController.delete);
}
