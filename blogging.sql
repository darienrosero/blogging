-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-05-2024 a las 08:13:22
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `blogging`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categorias` int(11) NOT NULL,
  `nombre_categoria` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categorias`, `nombre_categoria`) VALUES
(1, 'deportes'),
(2, 'divercion'),
(3, 'medicina'),
(4, 'moda'),
(5, 'ciencia'),
(6, 'comida'),
(7, 'farandula'),
(8, 'politica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_publicaiones`
--

CREATE TABLE `categorias_publicaiones` (
  `id` int(11) NOT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `publicacion_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id_comentarios` int(11) NOT NULL,
  `comentario` text DEFAULT NULL,
  `publicacion_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id_comentarios`, `comentario`, `publicacion_id`, `usuario_id`) VALUES
(1, 'la noticia es muy interesante ya quenos permite entender el funcionamiento de otros sitemas y como estos interactuan ', 5, 3),
(2, 'yo tambien pienso que missi es uno de los jugadores mas completos de la historia del futboll ', 6, 3),
(3, 'tenemos que armar un plan para ir a comer a ese lugar ', 4, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `id_publicaciones` int(11) NOT NULL,
  `usuario_que_publico` int(11) DEFAULT NULL,
  `titulo_publicacion` varchar(200) DEFAULT NULL,
  `contenido` text DEFAULT NULL,
  `fecha_publicacion` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`id_publicaciones`, `usuario_que_publico`, `titulo_publicacion`, `contenido`, `fecha_publicacion`) VALUES
(4, 5, 'rico almuerzo', 'hoy comimos en un restaurante nuevo', '2024-04-02'),
(5, 3, 'nuevo planeta', 'se ha encontrado un nuevo planeta en la galaxia andromeda ', '2022-08-10'),
(6, 3, 'balon de oro', 'mesi gana otro balon de oro y muchos fans dicen que es el mejor futbolista de la historia ', '2019-02-12'),
(7, 3, 'panico', ' en ecuador se presenta una ola de crimen organizado ', '2024-01-12'),
(9, 8, 'john wick', ' la secuela del asesino john continua. una pelicula esperada por los fans de la accion', '0000-00-00'),
(10, 8, 'meme', 'xd', '2024-02-05'),
(11, 8, 'vacuna contra corona-virus', 'varias empresas farmaceuticas an creado una vacuna contra el corona-virus, pronto se distribuira las bacunas por todo el mundo', '2022-02-05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(100) NOT NULL,
  `rol` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `rol`) VALUES
(1, 'administrador'),
(2, 'usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) DEFAULT NULL,
  `apellido` varchar(200) DEFAULT NULL,
  `fecha_de_nacimiento` date DEFAULT NULL,
  `pais_de_origen` varchar(100) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `contraseña` varchar(200) DEFAULT NULL,
  `rol_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `fecha_de_nacimiento`, `pais_de_origen`, `email`, `contraseña`, `rol_id`) VALUES
(2, 'ricardo', 'hernandez', '1999-05-03', 'brazil', 'ricardo@gmail.com', '159862374', 2),
(3, 'jose', 'padilla', '1997-04-24', 'uruguay', 'joseo@gmail.com', 'gyukop456', 2),
(4, 'mari luz', 'gomez', '1997-08-01', 'brasil', 'mari@gmail.com', '789369159', 2),
(5, 'pedro', 'quintero', '1998-07-30', 'argentina', 'pedro@gmail.com', 'ert456789', 2),
(7, 'antonio', 'machicado', '2001-07-30', 'argentina', 'antonio@gmail.com', 'qweftyu12', 2),
(8, 'darien', 'rosero', '2003-09-06', 'ecuador', 'darien@gmail.com', 'asdrty789', 2),
(10, 'jorge', 'peñafiel', '1998-07-30', 'ecuador', 'jorge@gmail.com', 'asdrty', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categorias`);

--
-- Indices de la tabla `categorias_publicaiones`
--
ALTER TABLE `categorias_publicaiones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`),
  ADD KEY `publicacion_id` (`publicacion_id`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id_comentarios`),
  ADD KEY `publicacion_id` (`publicacion_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`id_publicaciones`),
  ADD KEY `usuario_que_publico` (`usuario_que_publico`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rol_id` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categorias` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `categorias_publicaiones`
--
ALTER TABLE `categorias_publicaiones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id_comentarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `id_publicaciones` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `categorias_publicaiones`
--
ALTER TABLE `categorias_publicaiones`
  ADD CONSTRAINT `categorias_publicaiones_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id_categorias`),
  ADD CONSTRAINT `categorias_publicaiones_ibfk_2` FOREIGN KEY (`publicacion_id`) REFERENCES `publicaciones` (`id_publicaciones`);

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`publicacion_id`) REFERENCES `publicaciones` (`id_publicaciones`),
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `publicaciones_ibfk_1` FOREIGN KEY (`usuario_que_publico`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
