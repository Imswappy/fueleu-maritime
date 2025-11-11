import { Router } from 'express'
import { z } from 'zod'
import { BankingRepoPrisma } from '../../outbound/postgres/BankingRepoPrisma'
import { canBank, canApply } from '../../../core/application/Banking'

const bank = BankingRepoPrisma()
const r = Router()

r.get('/records', async (req,res)=>{
  const schema = z.object({ shipId: z.string(), year: z.coerce.number() })
  const q = schema.parse(req.query)
  res.json(await bank.records(q.shipId, q.year))
})

r.post('/bank', async (req,res)=>{
  const schema = z.object({ shipId: z.string(), year: z.number(), cbBefore: z.number() })
  const b = schema.parse(req.body)
  if(!canBank(b.cbBefore)) return res.status(400).json({ error:'CB not positive' })
  await bank.bank({ shipId:b.shipId, year:b.year, amount:b.cbBefore })
  res.json({ cb_before:b.cbBefore, applied:b.cbBefore, cb_after:0 })
})

r.post('/apply', async (req,res)=>{
  const schema = z.object({ shipId: z.string(), year: z.number(), amount: z.number() })
  const a = schema.parse(req.body)
  const avail = await bank.available(a.shipId, a.year)
  if(!canApply(avail, a.amount)) return res.status(400).json({ error:'Insufficient banked' })
  await bank.apply(a)
  const after = avail - a.amount
  res.json({ cb_before:avail, applied:a.amount, cb_after:after })
})

export default r
