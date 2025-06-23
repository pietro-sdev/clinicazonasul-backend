import { PacienteRepository } from '../repository/paciente-repository.js'
import { cloudinary } from '../lib/cloudinary.js'
import type { UploadApiResponse } from 'cloudinary'
import { Paciente } from '../model/Pacients.js'

async function uploadFoto(buf: Buffer): Promise<string> {
  const res: UploadApiResponse = await new Promise((ok, err) =>
    cloudinary.uploader.upload_stream(
      { folder: 'vet-system/pacientes', resource_type: 'image' },
      (e, r) => (e || !r ? err(e) : ok(r)),
    ).end(buf),
  )
  return res.secure_url
}

export const PacienteService = {
  async createPaciente(
    data: Omit<Paciente, 'id' | 'createdAt' | 'updatedAt' | 'fotoPerfil'>,
    file?: Buffer,
  ) {
    const fotoPerfil = file ? await uploadFoto(file) : null
    return PacienteRepository.create({ ...data, fotoPerfil })
  },

  async listPacientes(page = 1, perPage = 20) {
    const [items, total] = await Promise.all([
      PacienteRepository.findMany(page, perPage),
      PacienteRepository.count(),
    ])
    return { items, page, totalPages: Math.max(1, Math.ceil(total / perPage)) }
  },

  async getPacienteById(id: string) {
    const p = await PacienteRepository.findById(id)
    if (!p) throw new Error('Paciente não encontrado')
    return p
  },

  async updatePaciente(id: string, data: Partial<Paciente>) {
    return PacienteRepository.update(id, data)
  },

  async deletePaciente(id: string) {
    return PacienteRepository.delete(id)
  },
}
