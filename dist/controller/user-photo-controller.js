import jwt from 'jsonwebtoken';
import { UserPhotoService } from '../service/user-photo-service';
export const UserPhotoController = {
    async upload(req, reply) {
        const token = req.cookies.token;
        if (!token)
            return reply.code(401).send({ message: 'Unauthorized' });
        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
        }
        catch {
            return reply.code(401).send({ message: 'Invalid token' });
        }
        const mpFile = (await req.file());
        if (!mpFile)
            return reply.code(400).send({ message: 'Arquivo obrigatório' });
        const buffer = await mpFile.toBuffer();
        try {
            const user = await UserPhotoService.changePhoto(payload.id, buffer);
            return reply.send({ profilePhoto: user.profilePhoto });
        }
        catch (err) {
            req.log.error(err);
            return reply.code(500).send({ message: 'Erro interno ao trocar foto' });
        }
    },
};
