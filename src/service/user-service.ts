import jwt from 'jsonwebtoken'
import { UserRepository } from '../repository/user-repository'
import { AuthenticatedUser } from '../model/User'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'

export const UserService = {
  async getAuthenticatedUser(token: string): Promise<AuthenticatedUser> {
    if (!token) throw new Error('Not authenticated')

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string }

    const user = await UserRepository.findById(decoded.id)
    if (!user) throw new Error('User not found')

    const {
      password,
      createdAt,
      updatedAt,
      ...rest
    } = user

    const safeUser: AuthenticatedUser = {
      ...rest,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString()
    }

    return safeUser
  },

  async changePassword(userId: string, current: string, next: string) {
    const user = await UserRepository.findById(userId)
    if (!user) throw new Error('User not found')

    const isMatch = await bcrypt.compare(current, user.password)
    if (!isMatch) throw new Error('Current password is incorrect')

    const hashed = await bcrypt.hash(next, 10)
    await UserRepository.updatePassword(user.id, hashed)
  }
}
