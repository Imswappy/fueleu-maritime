import express from 'express'
import cors from 'cors'
import routesRouter from '../../adapters/inbound/http/routes'
import complianceRouter from '../../adapters/inbound/http/compliance'
import bankingRouter from '../../adapters/inbound/http/banking'
import poolsRouter from '../../adapters/inbound/http/pools'

export function createServer(){
  const app = express()
  app.use(cors())
  app.use(express.json())

  app.get('/health', (_req, res) => res.json({ ok: true }))

  app.use('/routes', routesRouter)
  app.use('/compliance', complianceRouter)
  app.use('/banking', bankingRouter)
  app.use('/pools', poolsRouter)

  return app
}
