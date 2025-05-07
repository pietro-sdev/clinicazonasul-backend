import { ProdutoService } from '../service/produto-service';
import { z } from 'zod';
const schema = z.object({
    nome: z.string(),
    dose: z.string(),
    precoCaixa: z.coerce.number().positive(),
    precoUnitario: z.coerce.number().positive(),
});
export const ProdutoController = {
    async list(_, reply) {
        const result = await ProdutoService.list();
        reply.send(result);
    },
    async create(req, reply) {
        const body = schema.parse(req.body);
        const produto = await ProdutoService.create(body);
        reply.status(201).send(produto);
    },
    async update(req, reply) {
        const { id } = req.params;
        const body = schema.partial().parse(req.body);
        const produto = await ProdutoService.update(id, body);
        reply.send(produto);
    },
    async delete(req, reply) {
        const { id } = req.params;
        await ProdutoService.delete(id);
        reply.status(204).send();
    },
};
