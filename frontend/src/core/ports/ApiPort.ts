import type { RouteDTO, ComparisonDTO, KPI } from '../domain/types'
export interface ApiPort {
  getRoutes(filters?:Partial<Pick<RouteDTO,'vesselType'|'fuelType'|'year'>>):Promise<RouteDTO[]>
  setBaseline(id:string):Promise<void>
  getComparison():Promise<ComparisonDTO[]>
  getCB(shipId:string,year:number,actual:number,fuelTons:number):Promise<{ shipId:string; year:number; cb:number }>
  getAdjustedCB(shipId:string,year:number):Promise<{ shipId:string; year:number; cb:number }>
  bank(shipId:string,year:number,cbBefore:number):Promise<KPI>
  applyBank(shipId:string,year:number,amount:number):Promise<KPI>
  createPool(year:number,members:{shipId:string;cbBefore:number}[]):Promise<{ year:number; members:{shipId:string;cbBefore:number;cbAfter:number}[]; sum:number }>
}
