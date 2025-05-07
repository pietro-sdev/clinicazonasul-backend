export class AcompanhamentoService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(data) {
        return this.repo.create(data);
    }
    async listByPaciente(pacienteId) {
        return this.repo.findByPaciente(pacienteId);
    }
}
