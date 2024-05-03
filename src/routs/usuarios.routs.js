import { Router } from 'express'
import { actualizacion, actualizarPublicacion, buscarPublicaciones, comentar, editarComentario, eliminarComentario, eliminarCuenta, eliminarPublicacion, nuevaPublicacion, publicaiones, registro } from '../controller/usuarios.controller.js'

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

// esta ruta permite comentar las publicaciones (dentro de la dimamica de nombre se busca pasar el nombre de quien esta comentando y en la dinamica de categorias se busca pasar el titulo de la publicacion que se quiere comentar)
router.post('/comentar/:nombre/:categorias', comentar)

// esta ruta permite editar los comentarios propios (dentro de la dinamica de categorias se busca pasar el nombre de la publicacion que quiere editar)
router.put('/comentar/editar/:nombre/:categorias', editarComentario)

// esta ruta permite eliminar un comentario (dentro de la dinamica de categorias se busca pasar el nombre de la publicacion que quiere eliminar y el la dinamica de nombre se busca pasar el nombre del usuario que esta eliminando el comentario)
router.delete('/comentar/eliminar/:nombre/:categorias', eliminarComentario)

export default router
