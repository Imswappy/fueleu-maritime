import type { RouteDTO, ComparisonDTO } from '../domain/types'
import { TARGET_2025 } from '../../shared/constants'
export function compareRoutes(baseline: RouteDTO, others: RouteDTO[]): ComparisonDTO[] {
  return others.map(r => {
    const base = baseline.ghgIntensity
    const comp = r.ghgIntensity
    const percentDiff = ((comp / base) - 1) * 100
    const compliant = comp <= TARGET_2025
    return { baseline: base, comparison: comp, percentDiff, compliant, route: r }
  })
}
