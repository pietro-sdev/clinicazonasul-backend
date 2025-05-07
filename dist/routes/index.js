import { authRoutes } from './auth-routes';
import { userRoutes } from './user-routes';
import { pacienteRoutes } from './paciente-routes';
import { produtoRoutes } from './produto-routes';
import { userPhotoRoutes } from './user-photo-routes';
import { vacinaRoutes } from './vacina-routes';
import { consultaRoutes } from './consulta-routes';
import { acompanhamentoRoutes } from './acompanhamento-routes';
import { dashboardRoutes } from './dashboard-routes';
export async function registerRoutes(app) {
    app.register(authRoutes);
    app.register(userRoutes);
    app.register(pacienteRoutes);
    app.register(produtoRoutes);
    app.register(userPhotoRoutes);
    app.register(vacinaRoutes);
    app.register(consultaRoutes);
    app.register(acompanhamentoRoutes);
    app.register(dashboardRoutes);
}
