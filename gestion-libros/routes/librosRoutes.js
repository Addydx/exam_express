const express = require('express');
const router = express.Router();
const librosController = require('../controllers/libroscontroller');

// RESTful routes with HTML form support
router.get('/', librosController.listarLibros); // List all books
router.get('/nuevo', librosController.mostrarFormularioNuevo); // Show new book form
router.post('/', librosController.crearLibro); // Create new book

// Edit routes
router.get('/:id/editar', librosController.mostrarFormularioEditar); // Show edit form
router.put('/:id', librosController.actualizarLibro); // Handle edit form submission
router.post('/:id/editar', librosController.actualizarLibro); // Alternative for forms

// Delete routes
router.get('/:id/eliminar', librosController.mostrarEliminar); // Show delete confirmation
router.delete('/:id', librosController.eliminarLibro); // Handle delete
router.post('/:id/eliminar', librosController.eliminarLibro); // Alternative for forms

module.exports = router;