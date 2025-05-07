import { DashboardController } from '../controller/dashboard-controller';
export async function dashboardRoutes(app) {
    app.get('/dashboard/resumo', DashboardController.getResumo);
}
