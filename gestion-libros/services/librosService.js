const Libro = require('../models/libro');

exports.obtenerTodosLibros = async () => {
  return await Libro.findAll();
};

exports.obtenerLibroPorId = async (id) => {
  const libro = await Libro.findByPk(id);
  if (!libro) throw new Error('Libro no encontrado');
  return libro;
};

// En servicios/librosService.js
exports.crearLibro = async (datos) => {
  // ... validaciones anteriores
  if (isNaN(datos.anio_publicacion) || datos.anio_publicacion < -3000 || datos.anio_publicacion > new Date().getFullYear()) {
    throw new Error('Año de publicación no válido');
  }
  // ...
};

exports.actualizarLibro = async (id, datos) => {
  const libro = await Libro.findByPk(id);
  if (!libro) {
    throw new Error('Libro no encontrado');
  }
  
  // Validaciones
  if (!datos.titulo || !datos.autor || !datos.anio_publicacion || !datos.genero) {
    throw new Error('Todos los campos son obligatorios');
  }

  return await libro.update({
    titulo: datos.titulo,
    autor: datos.autor,
    anio_publicacion: datos.anio_publicacion,
    genero: datos.genero
  });
};

exports.eliminarLibro = async (id) => {
  const libro = await Libro.findByPk(id);
  if (!libro) {
    throw new Error('Libro no encontrado');
  }
  await libro.destroy();
  return true;
};