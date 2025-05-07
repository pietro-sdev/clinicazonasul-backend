import { DashboardRepository } from '../repository/dashboard-repository'
import { DashboardSummary } from '../model/Dashboard'

export class DashboardService {
  constructor(private repo: DashboardRepository) {}

  async obterResumo(): Promise<DashboardSummary> {
    return this.repo.getResumo()
  }
}