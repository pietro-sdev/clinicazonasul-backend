export interface AuthenticatedUser {
    id: string
    name: string
    email: string
    role: string
    phone: string
    zipCode: string
    street: string
    neighborhood: string
    state: string
    complement: string | null
    profilePhoto: string | null
    createdAt: string
    updatedAt: string
  }
  