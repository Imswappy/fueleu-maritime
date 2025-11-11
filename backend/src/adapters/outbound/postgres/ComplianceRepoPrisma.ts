import { prisma } from './PrismaClient'
import type { CBRecord } from '../../../core/domain/types'
export const ComplianceRepoPrisma = () => ({
  async saveSnapshot(r: CBRecord){ await prisma.shipCompliance.create({ data:{ shipId:r.shipId, year:r.year, cb:r.cb }}) },
  async latest(shipId: string, year: number){ const row = await prisma.shipCompliance.findFirst({ where:{ shipId, year }, orderBy:{ createdAt:'desc' } }); return row?{ shipId:row.shipId, year:row.year, cb:row.cb }:null }
})
