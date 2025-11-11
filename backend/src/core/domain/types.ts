export type RouteDTO = {
  id: string
  routeId: string
  vesselType: string
  fuelType: string
  year: number
  ghgIntensity: number
  fuelTons: number
  distanceKm: number
  totalEmissionsT: number
  isBaseline: boolean
}
export type ComparisonDTO = {
  baseline: number
  comparison: number
  percentDiff: number
  compliant: boolean
  route: RouteDTO
}
export type CBRequest = { shipId: string; year: number; actualIntensity: number; fuelTons: number; target: number }
export type CBRecord  = { shipId: string; year: number; cb: number }
export type BankAction = { shipId: string; year: number; amount: number }
export type PoolMemberInput = { shipId: string; cbBefore: number }
export type PoolResult = { year: number; members: { shipId: string; cbBefore: number; cbAfter: number }[]; sum: number }
