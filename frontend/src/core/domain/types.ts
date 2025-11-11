export type RouteDTO = { id:string; routeId:string; vesselType:string; fuelType:string; year:number; ghgIntensity:number; fuelTons:number; distanceKm:number; totalEmissionsT:number; isBaseline:boolean }
export type ComparisonDTO = { baseline:number; comparison:number; percentDiff:number; compliant:boolean; route:RouteDTO }
export type KPI = { cb_before:number; applied:number; cb_after:number }
