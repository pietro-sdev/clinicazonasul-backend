export class DashboardService {
    constructor(repo) {
        this.repo = repo;
    }
    async obterResumo() {
        return this.repo.getResumo();
    }
}
