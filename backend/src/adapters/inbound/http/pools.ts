import { Router } from 'express'
import { z } from 'zod'
import { createPool } from '../../../core/application/Pooling'
import { PoolRepoPrisma } from '../../outbound/postgres/PoolRepoPrisma'

const repo = PoolRepoPrisma()
const r = Router()

r.post('/', async (req,res)=>{
  const schema = z.object({
    year: z.number(),
    members: z.array(z.object({ shipId: z.string(), cbBefore: z.number() }))
  })
  const p = schema.parse(req.body)
  const result = createPool(p.year, p.members)
  await repo.create(p.year, result.members)
  res.json(result)
})

export default r
