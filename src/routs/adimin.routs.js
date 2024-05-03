import { Router } from 'express'
import { categorias, categoriasActualizadas, categoriasEliminadas, categoriasNuevas, index } from '../controller/admin.controller.js'

const router = Router()

// est ruta muestra todos los usuarios
router.get('/blogging/usuarios/:nombre', index)

// esta ruta permite obtener todas las categorias de las publicaciones

router.get('/categorias/:nombre', categorias)

// esta ruta perimite crear categorias de las publicaciones
router.post('/categorias/nueva/:nombre', categoriasNuevas)

// esta ruta permite actulizar las categorias

router.put('/categorias/actualizar/:nombre/:categorias', categoriasActualizadas)

// esta ruta permite elimar categorias

router.delete('/categorias/eliminar/:nombre/:categorias', categoriasEliminadas)

export default router
