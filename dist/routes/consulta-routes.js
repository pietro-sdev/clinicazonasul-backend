import { ConsultaController } from '../controller/consulta-controller';
export async function consultaRoutes(app) {
    app.post('/pacientes/:pacienteId/consultas', ConsultaController.create);
    app.get('/pacientes/:pacienteId/consultas', ConsultaController.list);
}
