const express= require('express');
const route= express.Router();
const cursosController = require('../controller/cursosController.js');

//gestio las rutas del estuciante

//get para mostrarlos todos
route.get('/',cursosController.consultar);
//post para crear un estudiante
route.post('/',cursosController.ingresar);
//post para asociar un estudiante a un curso
route.post('/inscribirte',cursosController.asociarEstudianteCurso);

   //para las rutas que tienen id podemos octimizar el codigo
   
route.route('/:id')
   .put(cursosController.actualizar)
   .delete(cursosController.borrar)
   .get(cursosController.consultarDetalles);

module.exports= route;

