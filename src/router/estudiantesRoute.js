const express= require('express');
const route= express.Router();
const estudianteController = require('../controller/estudiantesController.js');

//gestio las rutas del estuciante

//get para mostrarlos todos
route.get('/', estudianteController.consultar);
//post para crear un estudiante
route.post('/',estudianteController.ingresar);

   //para las rutas que tienen id podemos octimizar el codigo
route.route('/:id')
   .get(estudianteController.consultarDetalles)
   .put(estudianteController.actualizar)
   .delete(estudianteController.borrar);

module.exports= route;

