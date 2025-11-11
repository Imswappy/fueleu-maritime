import { Router } from 'express'
import { RouteRepoPrisma } from '../../outbound/postgres/RouteRepoPrisma'
import { compareRoutes } from '../../../core/application/ComputeComparison'
import type { RouteDTO } from '../../../core/domain/types'

const repo = RouteRepoPrisma()
const r = Router()

r.get('/', async (req, res) => {
  const filters: any = {}
  if (req.query.vesselType) filters.vesselType = String(req.query.vesselType)
  if (req.query.fuelType) filters.fuelType = String(req.query.fuelType)
  if (req.query.year) filters.year = Number(req.query.year)
  res.json(await repo.all(filters))
})

r.post('/:id/baseline', async (req, res) => {
  await repo.setBaseline(req.params.id)
  res.json({ ok: true })
})

r.get('/comparison', async (_req, res) => {
  const base = await repo.baseline()
  if (!base) return res.status(400).json({ error: 'No baseline' })
  const others = (await repo.all()).filter((x: RouteDTO) => x.id !== base.id)
  res.json(compareRoutes(base, others))
})

export default r
