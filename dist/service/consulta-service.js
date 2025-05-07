import { ConsultaRepository } from '../repository/consulta-repository';
export const ConsultaService = {
    async addConsulta(pacienteId, payload) {
        return ConsultaRepository.create(pacienteId, payload);
    },
    async listPorPaciente(pacienteId) {
        return ConsultaRepository.findByPaciente(pacienteId);
    },
};
