import { AuthController } from '../controller/auth-controller';
export async function authRoutes(app) {
    app.post('/login', AuthController.login);
}
