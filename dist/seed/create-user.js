import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
async function main() {
    const passwordHash = await bcrypt.hash('123456', 10);
    await prisma.user.createMany({
        data: [
            {
                id: crypto.randomUUID(),
                name: 'Admin User',
                role: 'ADMIN',
                email: 'admin@example.com',
                password: passwordHash,
                zipCode: '12345-678',
                street: 'Admin Street',
                neighborhood: 'Admin Neighborhood',
                state: 'SP',
                complement: null,
                phone: '(11) 99999-9999',
                profilePhoto: null,
            },
            {
                id: crypto.randomUUID(),
                name: 'Veterinarian User',
                role: 'VETERINARIAN',
                email: 'vet@example.com',
                password: passwordHash,
                zipCode: '87654-321',
                street: 'Vet Street',
                neighborhood: 'Vet Neighborhood',
                state: 'RJ',
                complement: null,
                phone: '(21) 98888-8888',
                profilePhoto: null,
            }
        ],
        skipDuplicates: true
    });
    console.log('✅ Seed completed!');
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(() => {
    prisma.$disconnect();
});
