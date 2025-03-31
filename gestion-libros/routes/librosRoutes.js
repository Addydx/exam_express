const express = require('express');
const router = express.Router();
const librosController = require('../controllers/librosController');

// CRUD de Libros
router.get('/', librosController.listarLibros);
router.get('/nuevo', librosController.mostrarFormularioNuevo);
router.post('/', librosController.crearLibro);
router.get('/:id/editar', librosController.mostrarFormularioEditar);
router.put('/:id', librosController.actualizarLibro);
router.delete('/:id/eliminar', librosController.eliminarLibro);



module.exports = router;