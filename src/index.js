import express from 'express'
import { PORT } from './config/config.js'
import adminRouts from './routs/adimin.routs.js'
import usuariosRouts from './routs/usuarios.routs.js'

const app = express()

app.use(express.json())

app.use(adminRouts)

app.use(usuariosRouts)

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))
