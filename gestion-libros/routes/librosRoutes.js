const express = require('express');
const router = express.Router();
const librosController = require('../controllers/libroscontroller');

router.get('/', librosController.listarLibros); 
router.get('/nuevo', librosController.mostrarFormularioNuevo); 
router.post('/', librosController.crearLibro); 

router.get('/:id/editar', librosController.mostrarFormularioEditar); 
router.put('/:id', librosController.actualizarLibro); 
router.post('/:id/editar', librosController.actualizarLibro); 

router.get('/:id/eliminar', librosController.mostrarEliminar); 
router.delete('/:id', librosController.eliminarLibro); 
router.post('/:id/eliminar', librosController.eliminarLibro); 

module.exports = router;