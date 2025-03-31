const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const librosRoutes = require('./routes/librosRoutes');
const Libro = require('./models/libro');

const app = express();

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Para formularios
app.use(express.json()); // Para datos en JSON
app.use(methodOverride('_method')); // Permite usar DELETE y PUT en formularios

// Rutas
app.use('/libros', librosRoutes);
app.get('/', (req, res) => res.redirect('/libros'));

// Sincronizar la base de datos y levantar el servidor
const PORT = process.env.PORT || 3000;
(async () => {
  try {
    await Libro.sync({ force: false }); // Verifica que la tabla existe sin borrarla
    console.log('✅ Tabla de libros verificada');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al sincronizar la base de datos:', error);
  }
})();
