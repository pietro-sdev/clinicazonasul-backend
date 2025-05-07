export interface Paciente {
  id: string
  nomeAnimal: string
  nomeTutor: string
  raca: string
  especie: string
  dataNascimento: string        // ISO 8601
  idade: number
  peso: number
  cep: string
  estado: string
  rua: string
  bairro: string
  numero: string
  complemento?: string | null
  telefones: string[]           // até 3 telefones
  emails: string[]              // até 3 e-mails
  fotoPerfil?: string | null
  createdAt: Date
  updatedAt: Date
}
