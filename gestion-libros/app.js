const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const librosRoutes = require('./routes/librosRoutes');

const app = express();

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Rutas
app.use('/libros', librosRoutes);
app.get('/', (req, res) => res.redirect('/libros'));

// Sincronizar la base de datos
const Libro = require('./models/libro');
// En app.js, cambiar la sincronización:
Libro.sync({ force: false }) // force: false evita que borre la tabla existente
  .then(() => {
    console.log('✅ Tabla de libros verificada');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor en http://localhost:${PORT}`);
    });
  })