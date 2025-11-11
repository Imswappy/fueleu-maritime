import { useEffect, useState } from 'react'
import { useApi } from '../../core/application/useApi'
import type { RouteDTO } from '../../core/domain/types'

export default function RoutesTab(){
  const api = useApi()
  const [routes,setRoutes]=useState<RouteDTO[]>([])
  const [filters,setFilters]=useState({ vesselType:'', fuelType:'', year:'' })

  useEffect(()=>{ api.getRoutes().then(setRoutes) },[])

  const apply=async()=>{
    const f:any={}
    if(filters.vesselType) f.vesselType=filters.vesselType
    if(filters.fuelType) f.fuelType=filters.fuelType
    if(filters.year) f.year=Number(filters.year)
    setRoutes(await api.getRoutes(f))
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input className="border p-2" placeholder="vesselType" value={filters.vesselType} onChange={e=>setFilters(s=>({...s,vesselType:e.target.value}))}/>
        <input className="border p-2" placeholder="fuelType" value={filters.fuelType} onChange={e=>setFilters(s=>({...s,fuelType:e.target.value}))}/>
        <input className="border p-2" placeholder="year" value={filters.year} onChange={e=>setFilters(s=>({...s,year:e.target.value}))}/>
        <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={apply}>Filter</button>
      </div>
      <table className="min-w-full bg-white">
        <thead><tr className="text-left">
          <th className="p-2">routeId</th><th className="p-2">vesselType</th><th className="p-2">fuelType</th><th className="p-2">year</th><th className="p-2">ghgIntensity</th><th className="p-2">fuelConsumption(t)</th><th className="p-2">distance(km)</th><th className="p-2">totalEmissions(t)</th><th className="p-2">baseline</th>
        </tr></thead>
        <tbody>
          {routes.map(r=><tr key={r.id} className="border-t">
            <td className="p-2">{r.routeId}</td>
            <td className="p-2">{r.vesselType}</td>
            <td className="p-2">{r.fuelType}</td>
            <td className="p-2">{r.year}</td>
            <td className="p-2">{r.ghgIntensity.toFixed(4)}</td>
            <td className="p-2">{r.fuelTons}</td>
            <td className="p-2">{r.distanceKm}</td>
            <td className="p-2">{r.totalEmissionsT}</td>
            <td className="p-2">
              {r.isBaseline ? '✅' :
                <button className="px-2 py-1 bg-emerald-600 text-white rounded"
                  onClick={async()=>{ await api.setBaseline(r.id); setRoutes(await api.getRoutes()) }}>
                  Set Baseline
                </button>}
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}
