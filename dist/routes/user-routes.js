import { UserController } from '../controller/user-controller';
export async function userRoutes(app) {
    app.get('/me', UserController.me);
    app.post('/users/change-password', UserController.changePassword);
}
