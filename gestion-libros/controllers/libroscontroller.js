const librosService = require('../services/librosService');

exports.listarLibros = async (req, res) => {
    try {
        const { genero } = req.query;
        const libros = genero 
            ? await librosService.buscarPorGenero(genero)
            : await librosService.obtenerTodosLibros();
        res.render('libros/listaLibros', { libros }); // Aquí estaba mal
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.mostrarFormularioNuevo = (req, res) => {
    res.render('libros/formularioLibro', { libro: null, modo: 'crear' });
  };
  

exports.crearLibro = async (req, res) => {
    try {
        await librosService.crearLibro(req.body);
        res.redirect('/libros');
    } catch (error) {
        res.render('libros/formularioLibro', { 
            libro: req.body, 
            modo: 'crear',
            error: error.message 
        });
    }
};

exports.mostrarFormularioEditar = async (req, res) => {
    try {
      const libro = await librosService.obtenerLibroPorId(req.params.id);
      res.render('libros/formularioLibro', { libro, modo: 'editar' });
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
  

exports.actualizarLibro = async (req, res) => {
    try {
        await librosService.actualizarLibro(req.params.id, req.body);
        res.redirect('/libros');
    } catch (error) {
        res.render('libros/formularioLibro', { 
            libro: req.body, 
            modo: 'editar',
            error: error.message 
        });
    }
};

exports.mostrarEliminar = async (req, res) => {
    try {
        const libro = await librosService.obtenerLibroPorId(req.params.id);
        if (!libro) {
            return res.redirect('/libros');
        }
        res.render('libros/eliminarLibro', { libro });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.eliminarLibro = async (req, res) => {
    try {
        await librosService.eliminarLibro(req.params.id);
        res.redirect('/libros');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
