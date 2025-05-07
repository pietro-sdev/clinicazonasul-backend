import { UserPhotoController } from '../controller/user-photo-controller';
export async function userPhotoRoutes(app) {
    app.post('/users/photo', UserPhotoController.upload);
}
