//Crea el server principal

//npm install express mongoose body-parser cors
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');//URL y https

//const rutas
// Donantes
const donantesRoutes = require('./routes/DonantesRoutes');

// Donaciones
const donacionesRoutes = require('./routes/DonacionesRoutes');

// Beneficiarios
const beneficiariosRoutes = require('./routes/BeneficiariosRoutes');

// Proyectos Solidarios
const proyectosSolidariosRoutes = require('./routes/ProyectosSolidariosRoutes');

// Ubicaciones
const ubicacionesRoutes = require('./routes/UbicacionesRoutes');

// Campañas  (mejor sin ñ en el nombre del archivo)
const campanasRoutes = require('./routes/CampanasRoutes');

// Organizaciones
const organizacionesRoutes = require('./routes/OrganizacionesRoutes');

// Usuarios
const usuariosRoutes = require('./routes/UsuariosRoutes');

// Auditorías
const auditoriasRoutes = require('./routes/AuditoriasRoutes');

// Transacciones
const transaccionesRoutes = require('./routes/TransaccionesRoutes');

// Reportes de Impacto
const reportesImpactoRoutes = require('./routes/ReportesImpactoRoutes');

// Feedback
const feedbackRoutes = require('./routes/FeedbackRoutes');


const app = express();
const PORT = 3000;

//Middlewares (Son como las urls del sitio) 
app.use(cors());
app.use(bodyParser.json());

//Conexion hacia mongo
mongoose.connect('mongodb://localhost:27017/HOPE_CHAIN', {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then( ()=>console.log('Mongo DB Success')  )
.catch( err =>console.log('Mongo DB error: ', err )  );
//las rutas

app.use('/api/Donante', donantesRoutes);
app.use('/api/Donacion', donacionesRoutes);
app.use('/api/Beneficiario', beneficiariosRoutes);
app.use('/api/ProyectoSolidario', proyectosSolidariosRoutes);
app.use('/api/Ubicacion', ubicacionesRoutes);
app.use('/api/Campana', campanasRoutes);
app.use('/api/Organizacion', organizacionesRoutes);
app.use('/api/Usuario', usuariosRoutes);
app.use('/api/Auditoria', auditoriasRoutes);
app.use('/api/Transaccion', transaccionesRoutes);
app.use('/api/ReporteImpacto', reportesImpactoRoutes);
app.use('/api/Feedback', feedbackRoutes);


//Inciar el servidor, o como veremos el server.
app.listen(PORT, ()=>{
    console.log(`Servidor encendido http://localhost:${PORT}`);
});
