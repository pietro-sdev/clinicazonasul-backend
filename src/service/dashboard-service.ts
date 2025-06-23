import { DashboardRepository } from '../repository/dashboard-repository.js'
import { DashboardSummary } from '../model/Dashboard.js'

export class DashboardService {
  constructor(private repo: DashboardRepository) {}

  async obterResumo(): Promise<DashboardSummary> {
    return this.repo.getResumo()
  }
}