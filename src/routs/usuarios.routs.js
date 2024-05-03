import { Router } from 'express'
import { actualizacion, actualizarPublicacion, buscarPublicaciones, comentar, editarComentario, eliminarCuenta, eliminarPublicacion, nuevaPublicacion, publicaiones, registro } from '../controller/usuarios.controller.js'

const router = Router()

// ruta que permite registrarse
router.post('/registros', registro)

// ruta que permite actulizar informacion personal
router.put('/registros/actualizar/:nombre', actualizacion)

// ruta que permite eliminar una cuenta
router.delete('/registros/eliminar/:nombre', eliminarCuenta)

// esta ruta permite crear publicaciones
router.post('/publicacion/nueva/:id', nuevaPublicacion)

// esta ruta perimite actualizar las publicaiones personales
router.put('/publicacion/actualizar/:id/:nombre', actualizarPublicacion)

// esta ruta permite eliminar las publicaiones
router.delete('/publicacion/eliminar/:id/:nombre', eliminarPublicacion)

// ver publicaiones de un usuario
router.get('/publicaciones/:nombre', publicaiones)

// esta ruta busca las publicaiones por su titulo
router.get('/publicacion/titulo/:nombre', buscarPublicaciones)

// esta ruta permite comentar las publicaciones (dentro de la dimamica de la url se busca pasar el titulo de la publicacion)
router.post('/comentar/:nombre', comentar)

// esta ruta permite editar los comentarios propios
router.put('/comentar/editar/:nombre', editarComentario)

export default router
