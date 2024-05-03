import { pool } from '../config/db.js'

// esta funcion permite que un nuevo usuario se registre
export const registro = async (req, res) => {
  try {
    const { nombre, apellido, fecha_de_nacimiento: fechaDeNacimiento, pais_de_origen: paisDeOrigen, email, contraseña } = req.body

    if (!nombre || !apellido || !fechaDeNacimiento || !paisDeOrigen || !email || !contraseña) {
      res.status(400).json({ message: 'datos faltantes' })
      return
    }
    await pool.execute('INSERT INTO usuarios VALUES (null, ?, ?, ?, ?, ?, ?, 2)', [nombre, apellido, fechaDeNacimiento, paisDeOrigen, email, contraseña])
    res.status(201).json({ message: 'usuario creado como usuario normal' })
  } catch (error) {
    res.status(500).json({ message: 'hubo un error interno', details: error.message })
  }
}

// esta funcion permite actualizar datos personales
export const actualizacion = async (req, res) => {
  try {
    const nombreU = req.params.nombre
    const [usuarioId] = await pool.execute('SELECT rol_id FROM usuarios WHERE nombre = ?', [nombreU])

    if (usuarioId[0].rol_id !== 1) {
      const { nombre, apellido, fecha_de_nacimiento: fechaDeNacimiento, pais_de_origen: paisDeOrigen, email, contraseña } = req.body
      await pool.execute(' UPDATE usuarios SET nombre= ?, apellido = ?, fecha_de_nacimiento = ?, pais_de_origen = ?, email = ?, contraseña = ? WHERE nombre = ?', [nombre, apellido, fechaDeNacimiento, paisDeOrigen, email, contraseña, nombreU])
      res.status(201).json({ message: 'has editado tu informacion perosnas con exito' })
    } else if (usuarioId[0].rol_id === 1) {
      const { nombre, apellido, fecha_de_nacimiento: fechaDeNacimiento, pais_de_origen: paisDeOrigen, email, contraseña } = req.body

      await pool.execute(' UPDATE usuarios SET nombre= ?, apellido = ?, fecha_de_nacimiento = ?, pais_de_origen = ?, email = ?, contraseña = ? WHERE nombre = ?', [nombre, apellido, fechaDeNacimiento, paisDeOrigen, email, contraseña, nombreU])
      res.status(201).json({ message: 'has editado un usuario con exito' })
    } else {
      res.status(403).json({ message: 'no puedes editar la informacion de otro usuario si no eres administrador' })
    }
  } catch (error) {
    res.status(500).json({ message: 'hubo un error interno', details: error.message })
  }
}

// esta funcion permite eliminar una cuenta
export const eliminarCuenta = async (req, res) => {
  try {
    const nombreU = req.params.nombre
    const [usuarioRol] = await pool.execute('SELECT rol_id FROM usuarios WHERE nombre = ?', [nombreU])
    const { nombre } = req.body

    if (usuarioRol[0].rol_id !== 1) {
      await pool.execute('DELETE FROM usuarios WHERE nombre = ?', [nombreU])
      res.status(201).json({ message: 'has eliminado tu usuario' })
    } if (usuarioRol[0].rol_id === 1) {
      await pool.execute('DELETE FROM usuarios WHERE nombre = ?', [nombre])
      res.status(201).json({ message: 'usuario eliminado' })
    } else {
      res.status(403).json({ message: 'no eres un administrador' })
    }
  } catch (error) {
    res.status(500).json({ message: 'hubo un error interno', details: error.message })
  }
}

// esta funcion permite crear publicaiones
export const nuevaPublicacion = async (req, res) => {
  try {
    const { id } = req.params
    const { titulo_publicacion: tituloPublicacion, contenido, fecha_publicacion: fecha } = req.body

    await pool.execute('INSERT INTO publicaciones  VALUES ( null, ?, ?, ?, ?)', [id, tituloPublicacion, contenido, fecha])
    res.status(201).json({ message: 'publicaion subida' })
  } catch (error) {
    res.status(500).json({ message: 'hubo un error interno', details: error.message })
  }
}

// esta funcion permite actulizar sus publicaiones
export const actualizarPublicacion = async (req, res) => {
  const nombre = req.params.nombre
  const id = req.params.id
  try {
    const [publicacion] = await pool.execute('SELECT usuario_que_publico FROM publicaciones WHERE titulo_publicacion = ?', [nombre])
    if (publicacion.length === 0) {
      return res.status(404).json({ message: 'No se encontró la publicación' })
    }

    if (id === publicacion[0].usuario_que_publico.toString()) {
      const { titulo_publicacion: titulo, contenido, fecha_publicacion: fecha } = req.body
      await pool.execute('UPDATE publicaciones SET titulo_publicacion = ?, contenido = ?, fecha_publicacion = ? WHERE usuario_que_publico = ?', [titulo, contenido, fecha, id])
      return res.status(201).json({ message: 'has editado tu publicacion' })
    } else {
      res.status(403).json({ message: 'No tienes permiso para actualizar esta publicación' })
    }
  } catch (error) {
    res.status(404).json({ message: 'huvo un error interno', details: error.message })
  }
}

// esta funcion permite eliminar sus publicaciones
export const eliminarPublicacion = async (req, res) => {
  const nombre = req.params.nombre
  const id = req.params.id

  try {
    const [publicacion] = await pool.execute('SELECT usuario_que_publico FROM publicaciones WHERE titulo_publicacion = ?', [nombre])
    console.log(publicacion)
    if (publicacion.length === 0) {
      return res.status(404).json({ message: 'No se encontró la publicación' })
    }

    if (id === publicacion[0].usuario_que_publico.toString()) {
      await pool.execute('DELETE FROM publicaciones WHERE usuario_que_publico = ?', [id])
      res.status(201).json({ message: 'has eliminado una publicaion' })
    } else {
      res.status(403).json({ message: 'No tienes permiso para eliminar esta publicación' })
    }
  } catch (error) {
    res.status(404).json({ message: 'huvo un error interno', details: error.message })
  }
}

// esta funcion permite obtener todas las publicaiones de cada usuario
export const publicaiones = async (req, res) => {
  const nombre = req.params.nombre

  try {
    const [publicacion] = await pool.execute('SELECT usuarios.nombre, publicaciones.titulo_publicacion FROM publicaciones INNER JOIN usuarios ON publicaciones.usuario_que_publico = usuarios.id WHERE usuarios.nombre = ?', [nombre])

    if (publicacion.length === 0) {
      return res.status(404).json({ message: 'No se encontron las publicaciones' })
    }
    res.send(publicacion)
  } catch (error) {
    res.status(404).json({ message: 'huvo un error interno', details: error.message })
  }
}

// esta funcion busca las publicaciones por su titulo
export const buscarPublicaciones = async (req, res) => {
  try {
    const titulo = req.params.nombre
    const [publicacion] = await pool.execute('SELECT titulo_publicacion, contenido, fecha_publicacion FROM publicaciones WHERE titulo_publicacion = ? ', [titulo])

    if (publicacion.length === 0) {
      return res.status(404).json({ message: 'No se encontron las publicaciones' })
    }
    res.send(publicacion)
  } catch (error) {
    res.status(404).json({ message: 'huvo un error interno', details: error.message })
  }
}

// esta funcion crear comentarios
export const comentar = async (req, res) => {
  const usuarioPublicacion = req.params.nombre
  const tituloPublicacion = req.params.categorias
  const [publicacion] = await pool.execute('SELECT titulo_publicacion FROM publicaciones WHERE titulo_publicacion = ?', [tituloPublicacion])
  const [idPublicacion] = await pool.execute('SELECT id_publicaciones FROM publicaciones WHERE titulo_publicacion = ?', [tituloPublicacion])
  const [nombreId] = await pool.execute('SELECT id FROM usuarios WHERE nombre = ?', [usuarioPublicacion])
  const { comentario } = req.body
  const contenidoPublicacion = publicacion[0].titulo_publicacion
  const contenidoIdPublicacion = idPublicacion[0].id_publicaciones
  const contenidoUsuario = nombreId[0].id

  try {
    if (contenidoPublicacion === tituloPublicacion) {
      await pool.execute('INSERT INTO comentarios VALUES (null, ?, ?, ?)', [comentario, contenidoIdPublicacion, contenidoUsuario])
      res.status(200).json({ message: 'comentario publicado' })
    } else {
      res.status(403).json({ message: 'la publicaion que quieres comentar no existe' })
    }
  } catch (error) {
    res.status(404).json({ message: 'hubo un problema interno', details: error.message })
  }
}

// esta funcion permite actulizar los comentario
export const editarComentario = async (req, res) => {
  const nombre = req.params.nombre
  const publicaion = req.params.categorias
  const [idPublicacion] = await pool.execute('SELECT id_publicaciones FROM publicaciones WHERE titulo_publicacion = ?', [publicaion])
  const contenidoIdPublicacion = idPublicacion[0].id_publicaciones
  const [idComentario] = await pool.execute('SELECT publicacion_id FROM comentarios WHERE publicacion_id = ?', [contenidoIdPublicacion])
  const contenidoIdComentario = idComentario[0].publicacion_id

  const [idUsuario] = await pool.execute('SELECT id FROM usuarios WHERE nombre = ?', [nombre])
  const contenidoIdUsuario = idUsuario[0].id
  const [usuarioComentario] = await pool.execute('SELECT usuario_id FROM comentarios WHERE usuario_id = ?', [contenidoIdUsuario])
  const contenidoUsuario = usuarioComentario[0].usuario_id

  try {
    if (contenidoIdPublicacion === contenidoIdComentario && contenidoIdUsuario === contenidoUsuario) {
      const { comentario } = req.body
      await pool.execute('UPDATE comentarios SET comentario = ?, publicacion_id = ?, usuario_id = ?', [comentario, contenidoIdPublicacion, contenidoIdUsuario])
      res.status(200).json({ message: 'comentario editado' })
    } else {
      res.status(403).json({ message: 'este comentario no es tuyo' })
    }
  } catch (error) {
    res.status(404).json({ message: 'hubo un problema interno', details: error.message })
  }
}

// esta funcion permite eliminar comentarios
export const eliminarComentario = async (req, res) => {
  const nombre = req.params.nombre
  const publicaion = req.params.categorias
  const [idPublicacion] = await pool.execute('SELECT id_publicaciones FROM publicaciones WHERE titulo_publicacion = ?', [publicaion])
  const contenidoIdPublicacion = idPublicacion[0].id_publicaciones
  const [idComentario] = await pool.execute('SELECT publicacion_id FROM comentarios WHERE publicacion_id = ?', [contenidoIdPublicacion])
  const contenidoIdComentario = idComentario[0].publicacion_id

  const [idUsuario] = await pool.execute('SELECT id FROM usuarios WHERE nombre = ?', [nombre])
  const contenidoIdUsuario = idUsuario[0].id
  const [usuarioComentario] = await pool.execute('SELECT usuario_id FROM comentarios WHERE usuario_id = ?', [contenidoIdUsuario])
  const contenidoUsuario = usuarioComentario[0].usuario_id

  try {
    if (contenidoIdPublicacion === contenidoIdComentario && contenidoIdUsuario === contenidoUsuario) {
      const { comentario } = req.body
      await pool.execute('DELETE FROM comentarios where comentario = ?', [comentario])
      res.status(200).json({ message: 'comentario eliminado' })
    }
    res.status(403).json({ message: 'este comentario no es tuyo' })
  } catch (error) {
    res.status(404).json({ message: 'hubo un problema interno', details: error.message })
  }
}
