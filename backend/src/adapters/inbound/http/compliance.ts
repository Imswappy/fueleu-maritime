import { Router } from 'express'
import { z } from 'zod'
import { ComplianceRepoPrisma } from '../../outbound/postgres/ComplianceRepoPrisma'
import { computeCB } from '../../../core/application/ComputeCB'
import { TARGET_2025 } from '../../../shared/constants'

const repo = ComplianceRepoPrisma()
const r = Router()

r.get('/cb', async (req,res)=>{
  const schema = z.object({
    shipId: z.string(),
    year: z.coerce.number(),
    actual: z.coerce.number(),
    fuelTons: z.coerce.number(),
    target: z.coerce.number().default(TARGET_2025)
  })
  const q = schema.parse(req.query)
  const rec = computeCB({ shipId:q.shipId, year:q.year, actualIntensity:q.actual, fuelTons:q.fuelTons, target:q.target })
  await repo.saveSnapshot(rec)
  res.json(rec)
})

r.get('/adjusted-cb', async (req,res)=>{
  const schema = z.object({ shipId: z.string(), year: z.coerce.number() })
  const q = schema.parse(req.query)
  const latest = await repo.latest(q.shipId, q.year)
  if(!latest) return res.json({ shipId:q.shipId, year:q.year, cb:0 })
  res.json(latest)
})

export default r
