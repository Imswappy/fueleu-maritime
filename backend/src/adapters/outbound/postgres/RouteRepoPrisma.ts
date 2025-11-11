import { prisma } from './PrismaClient'
import type { RouteDTO } from '../../../core/domain/types'

export const RouteRepoPrisma = () => ({
  async all(filters?: Partial<Pick<RouteDTO,'vesselType'|'fuelType'|'year'>>): Promise<RouteDTO[]> {
    const where: any = {}
    if (filters?.vesselType) where.vesselType = filters.vesselType
    if (filters?.fuelType) where.fuelType = filters.fuelType
    if (typeof filters?.year === 'number') where.year = filters.year
    const rows = await prisma.route.findMany({ where, orderBy: { routeId: 'asc' } })
    return rows.map(r => ({
      id: r.id,
      routeId: r.routeId,
      vesselType: r.vesselType,
      fuelType: r.fuelType,
      year: r.year,
      ghgIntensity: r.ghgIntensity,
      fuelTons: r.fuelTons,
      distanceKm: r.distanceKm,
      totalEmissionsT: r.totalEmissionsT,
      isBaseline: r.isBaseline
    }))
  },

  async setBaseline(id: string): Promise<void> {
    await prisma.route.updateMany({ data: { isBaseline: false }, where: {} })
    await prisma.route.update({ where: { id }, data: { isBaseline: true } })
  },

  async baseline(): Promise<RouteDTO | null> {
    const r = await prisma.route.findFirst({ where: { isBaseline: true } })
    if (!r) return null
    return {
      id: r.id,
      routeId: r.routeId,
      vesselType: r.vesselType,
      fuelType: r.fuelType,
      year: r.year,
      ghgIntensity: r.ghgIntensity,
      fuelTons: r.fuelTons,
      distanceKm: r.distanceKm,
      totalEmissionsT: r.totalEmissionsT,
      isBaseline: r.isBaseline
    }
  }
})
