import { prisma } from './PrismaClient'
export const PoolRepoPrisma = () => ({
  async create(year: number, members: { shipId: string; cbBefore: number; cbAfter: number }[]){
    await prisma.$transaction(async tx=>{
      const pool = await tx.pool.create({ data:{ year } })
      for(const m of members){
        await tx.poolMember.create({ data:{ poolId:pool.id, shipId:m.shipId, cbBefore:m.cbBefore, cbAfter:m.cbAfter }})
      }
    })
  }
})
