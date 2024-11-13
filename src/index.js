//importo express
const express = require('express') //importo el frameword necesario
const port =process.env.PORT || 3000;
const cors = require('cors');
//ahora importo el modulo de estudiantes
const estudiantesRoute = require('./router/estudiantesRoute.js');
const profesoresRoute = require('./router/profesoresRoute.js');
const cursosRoute = require('./router/cursosRoute.js');



const app = express();

app.use(express.json()); // para no tener error con la data en json
app.use(cors()); // manejos de endopoint que se conectan a la api

//abro la primera ruta
app.get('/',(req,res)=>{
    res.send('te falta calle papito');
})

// para la ruta estudiantes usamos el archivo estudiantes.js

app.use('/estudiantes',estudiantesRoute);
app.use('/profesores',profesoresRoute);
app.use('/cursos',cursosRoute);

//creo el puerto de escucha en el servido
app.listen(port,()=>{
    console.log(`server running in the htpps://localhost:${port}`);
})

