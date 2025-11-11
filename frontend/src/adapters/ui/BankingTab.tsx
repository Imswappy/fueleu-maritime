import { useState } from 'react'
import { useApi } from '../../core/application/useApi'

export default function BankingTab(){
  const api = useApi()
  const [shipId,setShipId]=useState('S1')
  const [year,setYear]=useState(2025)
  const [actual,setActual]=useState(90)
  const [fuelTons,setFuelTons]=useState(100)
  const [cb,setCb]=useState<number|undefined>()
  const [kpi,setKpi]=useState<any>(null)

  const compute=async()=>{ const r=await api.getCB(shipId,year,actual,fuelTons); setCb(r.cb) }
  const bank=async()=>{ if(!cb||cb<=0) return; setKpi(await api.bank(shipId,year,cb)) }
  const apply=async()=>{ setKpi(await api.applyBank(shipId,year,Math.min(Math.abs(cb||0), Math.abs(cb||0)))) }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input className="border p-2" value={shipId} onChange={e=>setShipId(e.target.value)}/>
        <input className="border p-2" type="number" value={year} onChange={e=>setYear(Number(e.target.value))}/>
        <input className="border p-2" type="number" step="0.0001" value={actual} onChange={e=>setActual(Number(e.target.value))}/>
        <input className="border p-2" type="number" step="0.01" value={fuelTons} onChange={e=>setFuelTons(Number(e.target.value))}/>
        <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={compute}>Compute CB</button>
      </div>
      <div className="bg-white p-3 rounded">CB: {cb!==undefined?cb.toFixed(2):'-'}</div>
      <div className="flex gap-2">
        <button className="px-3 py-2 bg-emerald-600 text-white rounded disabled:opacity-50" disabled={!cb||cb<=0} onClick={bank}>Bank Surplus</button>
        <button className="px-3 py-2 bg-amber-600 text-white rounded" onClick={apply}>Apply Banked</button>
      </div>
      {kpi&&<div className="bg-white p-3 rounded">cb_before: {kpi.cb_before} applied: {kpi.applied} cb_after: {kpi.cb_after}</div>}
    </div>
  )
}
