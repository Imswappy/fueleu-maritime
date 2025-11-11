import { prisma } from './PrismaClient'
import type { BankAction } from '../../../core/domain/types'
export const BankingRepoPrisma = () => ({
  async records(shipId: string, year: number){ const rows = await prisma.bankEntry.findMany({ where:{ shipId, year }, orderBy:{ createdAt:'asc' } }); return rows.map(r=>({ amount:r.amount })) },
  async bank(a: BankAction){ await prisma.bankEntry.create({ data:{ shipId:a.shipId, year:a.year, amount:a.amount }}) },
  async available(shipId: string, year: number){ const rows = await prisma.bankEntry.findMany({ where:{ shipId, year } }); return rows.reduce((s,r)=>s+r.amount,0) },
  async apply(a: BankAction){ await prisma.bankEntry.create({ data:{ shipId:a.shipId, year:a.year, amount:-Math.abs(a.amount) }}) }
})
