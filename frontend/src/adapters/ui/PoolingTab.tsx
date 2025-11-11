import { useState } from 'react'
import { useApi } from '../../core/application/useApi'

export default function PoolingTab(){
  const api = useApi()
  const [year,setYear]=useState(2025)
  const [members,setMembers]=useState([{ shipId:'A', cbBefore:5000 },{ shipId:'B', cbBefore:-2000 },{ shipId:'C', cbBefore:-1000 }])
  const [result,setResult]=useState<any>(null)
  const sum = members.reduce((s,m)=>s+m.cbBefore,0)
  const create=async()=>{ setResult(await api.createPool(year,members)) }
  const update=(i:number,key:'shipId'|'cbBefore',v:any)=>{ setMembers(m=>m.map((x,idx)=>idx===i?{...x,[key]:key==='cbBefore'?Number(v):v}:x)) }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <input className="border p-2" type="number" value={year} onChange={e=>setYear(Number(e.target.value))}/>
        <span className={`px-2 py-1 rounded ${sum>=0?'bg-green-200':'bg-red-200'}`}>Pool Sum: {sum}</span>
      </div>
      <div className="space-y-2">
        {members.map((m,i)=><div key={i} className="flex gap-2">
          <input className="border p-2" value={m.shipId} onChange={e=>update(i,'shipId',e.target.value)}/>
          <input className="border p-2" type="number" value={m.cbBefore} onChange={e=>update(i,'cbBefore',e.target.value)}/>
        </div>)}
      </div>
      <button className="px-3 py-2 bg-blue-600 text-white rounded disabled:opacity-50" disabled={sum<0} onClick={create}>Create Pool</button>
      {result&&<div className="bg-white p-3 rounded">
        <div>Year: {result.year} Sum: {result.sum}</div>
        <table className="min-w-full mt-2">
          <thead><tr><th className="p-2">shipId</th><th className="p-2">cbBefore</th><th className="p-2">cbAfter</th></tr></thead>
          <tbody>{result.members.map((m:any)=><tr key={m.shipId} className="border-t"><td className="p-2">{m.shipId}</td><td className="p-2">{m.cbBefore}</td><td className="p-2">{m.cbAfter}</td></tr>)}</tbody>
        </table>
      </div>}
    </div>
  )
}
