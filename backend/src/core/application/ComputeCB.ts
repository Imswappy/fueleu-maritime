import type { CBRequest, CBRecord } from '../domain/types'
import { MJ_PER_TON } from '../../shared/constants'
export function computeCB(req: CBRequest): CBRecord {
  const energy = req.fuelTons * MJ_PER_TON
  const cb = (req.target - req.actualIntensity) * energy
  return { shipId: req.shipId, year: req.year, cb }
}
