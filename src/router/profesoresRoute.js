const express= require('express');
const route= express.Router();
const profesoresController = require('../controller/profesoresController.js');

//gestio las rutas del estuciante

//get para mostrarlos todos
route.get('/',profesoresController.consultar);
//post para crear un estudiante
route.post('/',profesoresController.ingresar);
   //para las rutas que tienen id podemos octimizar el codigo
   
route.route('/:id')
   .put(profesoresController.actualizar)
   .delete(profesoresController.borrar)
   .get(profesoresController.consultarDetalles);

module.exports= route;

