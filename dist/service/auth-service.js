import { UserRepository } from '../repository/user-repository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const AuthService = {
    async login(data) {
        const user = await UserRepository.findByEmail(data.email);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const passwordMatch = await bcrypt.compare(data.password, user.password);
        if (!passwordMatch) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role
        }, JWT_SECRET, { expiresIn: '1d' });
        const { password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
};
