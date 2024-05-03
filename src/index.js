import express from 'express'
import { PORT } from './config/config.js'
import adminRouts from './routs/adimin.routs.js'
import usuariosRouts from './routs/usuarios.routs.js'
import { swaggerDocs } from '../swaggerUi.js'

const app = express()

app.use(express.json())

app.use(adminRouts)

app.use(usuariosRouts)

swaggerDocs(app)
app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))
