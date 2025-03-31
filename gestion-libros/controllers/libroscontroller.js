const librosService = require('../services/librosService');
const Libro = require('../models/libro');

exports.listarLibros = async (req, res) => {
    try {
        const { genero } = req.query;
        const libros = genero 
            ? await librosService.buscarPorGenero(genero)
            : await librosService.obtenerTodosLibros();
        res.render('libros/listaLibros', { libros });
    } catch (error) {
        console.error("❌ Error al listar libros:", error);
        res.status(500).render('error', { 
            message: "Error al listar libros",
            error
        });
    }
};

exports.mostrarFormularioNuevo = (req, res) => {
    res.render('libros/formularioLibro', { 
        libro: null, 
        modo: 'crear',
        error: null 
    });
};

exports.crearLibro = async (req, res) => {
    try {
        await librosService.crearLibro(req.body);
        res.redirect('/libros');
    } catch (error) {
        console.error("❌ Error al crear libro:", error);
        res.render('libros/formularioLibro', { 
            libro: req.body, 
            modo: 'crear',
            error: error.message 
        });
    }
};

exports.mostrarFormularioEditar = async (req, res) => {
    try {
        const { id } = req.params;
        const libro = await librosService.obtenerLibroPorId(id);
        
        if (!libro) {
            return res.status(404).render('error', { 
                message: "Libro no encontrado" 
            });
        }
        
        res.render('libros/formularioLibro', { 
            libro, 
            modo: 'editar',
            error: null 
        });
    } catch (error) {
        console.error("❌ Error al cargar libro para editar:", error);
        res.status(500).render('error', { 
            message: "Error al cargar el libro",
            error
        });
    }
};

exports.actualizarLibro = async (req, res) => {
    try {
        await librosService.actualizarLibro(req.params.id, req.body);
        res.redirect('/libros');
    } catch (error) {
        console.error("❌ Error al actualizar libro:", error);
        res.render('libros/formularioLibro', { 
            libro: { ...req.body, id: req.params.id }, 
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
        console.error("❌ Error al cargar libro para eliminar:", error);
        res.status(500).render('error', { 
            message: "Error al cargar el libro",
            error
        });
    }
};

exports.eliminarLibro = async (req, res) => {
    try {
        const libro = await librosService.obtenerLibroPorId(req.params.id);
        if (!libro) {
            return res.redirect('/libros');
        }
        await librosService.eliminarLibro(req.params.id);
        res.redirect('/libros');
    } catch (error) {
        console.error("❌ Error al eliminar libro:", error);
        res.status(500).render('error', { 
            message: "Error al eliminar el libro",
            error
        });
    }
};