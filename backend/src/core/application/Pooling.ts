import type { PoolMemberInput, PoolResult } from '../domain/types'
export function createPool(year: number, inputs: PoolMemberInput[]): PoolResult {
  const sorted = [...inputs].sort((a,b)=>b.cbBefore-a.cbBefore)
  const result = sorted.map(m=>({ shipId:m.shipId, cbBefore:m.cbBefore, cbAfter:m.cbBefore }))
  const deficits = result.filter(m=>m.cbBefore<0).map(m=>({ shipId:m.shipId, need:Math.abs(m.cbBefore) }))
  for(const d of deficits){
    let remaining = d.need
    for(const m of result){
      if(remaining<=0) break
      if(m.cbAfter<=0) continue
      const give = Math.min(m.cbAfter, remaining)
      m.cbAfter -= give
      const target = result.find(x=>x.shipId===d.shipId)!
      target.cbAfter += give
      remaining -= give
    }
  }
  const sum = result.reduce((s,m)=>s+m.cbAfter,0)
  if(sum<0) throw new Error('Pool sum negative')
  for(const m of result){ if(m.cbBefore<0 && m.cbAfter<m.cbBefore) throw new Error('Deficit ship exits worse') }
  for(const m of result){ if(m.cbBefore>0 && m.cbAfter<0) throw new Error('Surplus ship exits negative') }
  return { year, members: result, sum }
}
