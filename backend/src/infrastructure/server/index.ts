import 'dotenv/config'
import { createServer } from './createServer'

const port = Number(process.env.PORT || 4000)
createServer().listen(port, () => {
  console.log(`api:${port}`)
})
