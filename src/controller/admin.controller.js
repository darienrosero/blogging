import { pool } from '../config/db.js'

// esta funcion obtine todos los usuarios de la base datos
export const index = async (req, res) => {
  try {
    const nombre = req.params.nombre
    const [usuarioId] = await pool.execute('SELECT rol_id FROM usuarios WHERE nombre = ?', [nombre])

    if (usuarioId[0].rol_id === 1) {
      const [usuarios] = await pool.query('SELECT * FROM usuarios')
      res.json(usuarios)
    } else {
      res.status(403).json({ message: 'no eres un administrador' })
    }
  } catch (error) {
    res.status(500).json({ message: 'hubo un error interno' })
  }
}

// permite obtener todas las categorias de las publicaciones
export const categorias = async (req, res) => {
  try {
    const nombre = req.params.nombre
    const [usuarioId] = await pool.execute('SELECT rol_id FROM usuarios WHERE nombre = ?', [nombre])
    if (usuarioId.length === 0) res.send('no puedes ver las categorias ya que no eres un administrador')
    if (usuarioId[0].rol_id === 1) {
      const [categorias] = await pool.query('SELECT * FROM categorias')
      res.json(categorias)
    } else {
      res.send('no eres un administrador')
    }
  } catch (error) {
    res.status(500).json({ message: 'hubo un error interno', details: error.message })
  }
}

// perimite crear categorias de las publicaciones
export const categoriasNuevas = async (req, res) => {
  try {
    const nombre = req.params.nombre
    const [usuarioId] = await pool.execute('SELECT rol_id FROM usuarios WHERE nombre = ?', [nombre])
    const { nombre_categoria: nombreCategoria } = req.body

    if (usuarioId[0].rol_id === 1) {
      if (!nombreCategoria) {
        res.status(400).json({ message: 'datos faltantes' })
      }
      await pool.execute('INSERT INTO categorias VALUES (null,?)', [nombreCategoria])
      res.status(201).json({ message: 'categorias creadas' })
    } else {
      res.status(403).json({ message: 'no eres un administrador' })
    }
  } catch (error) {
    res.status(500).json({ message: 'hubo un error interno' })
  }
}

// permite actulizar las categorias
export const categoriasActualizadas = async (req, res) => {
  try {
    const nombre = req.params.nombre
    const urlCategoria = req.params.categorias
    const [usuarioId] = await pool.execute('SELECT rol_id FROM usuarios WHERE nombre = ?', [nombre])
    const [categoria] = await pool.execute('SELECT nombre_categoria FROM categorias WHERE nombre_categoria = ?', [urlCategoria])

    const { id_categorias: idCategorias, nombre_categoria: nombreCategoria } = req.body

    if (categoria[0] === undefined) return res.send('la categoria que ingresate no existe')

    if (usuarioId[0].rol_id === 1) {
      if (!idCategorias || !nombreCategoria) {
        res.status(400).json({ message: 'datos faltantes' })
      }
      await pool.execute('UPDATE categorias SET nombre_categoria = ? WHERE id_categorias = ?', [nombreCategoria, idCategorias])
      res.status(201).json({ message: 'categorias actualizadas' })
    } else {
      res.status(403).json({ message: 'no eres un administrador' })
    }
  } catch (error) {
    res.status(500).json({ message: 'hubo un error interno', details: error.message })
  }
}

// permite elimar categorias
export const categoriasEliminadas = async (req, res) => {
  try {
    const nombre = req.params.nombre
    const categoria = req.params.categorias
    const [usuarioId] = await pool.execute('SELECT rol_id FROM usuarios WHERE nombre = ?', [nombre])
    const [urlCategoria] = await pool.execute('SELECT nombre_categoria FROM categorias WHERE nombre_categoria = ?', [categoria])
    const { nombre_categoria: nombreCategorias } = req.body

    if (urlCategoria[0] === undefined || nombreCategorias === undefined) return res.send('la categoria que ingresate no existe o no ingresaste la categoria en body')

    if (usuarioId[0].rol_id === 1) {
      await pool.execute('DELETE FROM categorias WHERE nombre_categoria = ?', [nombreCategorias])
      res.json({ message: 'categoria eliminada' })
    } else {
      res.status(403).json({ message: 'no eres un administrador' })
    }
  } catch (error) {
    res.status(500).json({ message: 'huvo un error interno', details: error.message })
  }
}
