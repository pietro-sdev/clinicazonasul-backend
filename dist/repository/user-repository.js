import { prisma } from '../prisma/client';
export const UserRepository = {
    async findByEmail(email) {
        return prisma.user.findUnique({
            where: { email }
        });
    },
    async findById(id) {
        return prisma.user.findUnique({
            where: { id }
        });
    },
    async updatePassword(id, newHashedPassword) {
        return prisma.user.update({
            where: { id },
            data: { password: newHashedPassword },
        });
    },
    async updateProfilePhoto(id, url) {
        return prisma.user.update({
            where: { id },
            data: { profilePhoto: url },
        });
    },
};
