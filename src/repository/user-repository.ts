import { prisma } from '../prisma/client'

export const UserRepository = {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    })
  },

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id }
    })
  },

  async updatePassword(id: string, newHashedPassword: string) {
    return prisma.user.update({
      where: { id },
      data: { password: newHashedPassword },
    })
  },

  async updateProfilePhoto(id: string, url: string) {
    return prisma.user.update({
      where: { id },
      data : { profilePhoto: url },
    })
  },
}


