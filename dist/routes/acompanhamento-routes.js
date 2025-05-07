import { AcompanhamentoController } from '../controller/acompanhamento-controller';
export async function acompanhamentoRoutes(app) {
    app.post('/pacientes/:pacienteId/acompanhamentos', AcompanhamentoController.create);
    app.get('/pacientes/:pacienteId/acompanhamentos', AcompanhamentoController.list);
}
