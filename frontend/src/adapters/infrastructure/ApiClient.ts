import axios from 'axios'
import type { ApiPort } from '../../core/ports/ApiPort'
import type { RouteDTO, ComparisonDTO, KPI } from '../../core/domain/types'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000' })

export const ApiClient = ():ApiPort=>({
  async getRoutes(filters){ const { data } = await api.get<RouteDTO[]>('/routes',{ params:filters }); return data },
  async setBaseline(id){ await api.post(`/routes/${id}/baseline`) },
  async getComparison(){ const { data } = await api.get<ComparisonDTO[]>('/routes/comparison'); return data },
  async getCB(shipId,year,actual,fuelTons){ const { data } = await api.get('/compliance/cb',{ params:{ shipId, year, actual, fuelTons } }); return data },
  async getAdjustedCB(shipId,year){ const { data } = await api.get('/compliance/adjusted-cb',{ params:{ shipId, year } }); return data },
  async bank(shipId,year,cbBefore){ const { data } = await api.post<KPI>('/banking/bank',{ shipId, year, cbBefore }); return data },
  async applyBank(shipId,year,amount){ const { data } = await api.post<KPI>('/banking/apply',{ shipId, year, amount }); return data },
  async createPool(year,members){ const { data } = await api.post('/pools',{ year, members }); return data }
})
