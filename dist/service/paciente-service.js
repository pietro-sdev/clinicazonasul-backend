import { PacienteRepository } from '../repository/paciente-repository';
import { cloudinary } from '../lib/cloudinary';
async function uploadFoto(buf) {
    const res = await new Promise((ok, err) => cloudinary.uploader.upload_stream({ folder: 'vet-system/pacientes', resource_type: 'image' }, (e, r) => (e || !r ? err(e) : ok(r))).end(buf));
    return res.secure_url;
}
export const PacienteService = {
    async createPaciente(data, file) {
        const fotoPerfil = file ? await uploadFoto(file) : null;
        return PacienteRepository.create({ ...data, fotoPerfil });
    },
    async listPacientes(page = 1, perPage = 20) {
        const [items, total] = await Promise.all([
            PacienteRepository.findMany(page, perPage),
            PacienteRepository.count(),
        ]);
        return { items, page, totalPages: Math.max(1, Math.ceil(total / perPage)) };
    },
    async getPacienteById(id) {
        const p = await PacienteRepository.findById(id);
        if (!p)
            throw new Error('Paciente não encontrado');
        return p;
    },
    async updatePaciente(id, data) {
        return PacienteRepository.update(id, data);
    },
    async deletePaciente(id) {
        return PacienteRepository.delete(id);
    },
};
