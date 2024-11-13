//accedo a la base de datos directamente
const db = require('../database/conexion');
//creo la clase estudiante
class EstudiantesController{

    //toda clase tiene un constructor
    constructor(){

    }

    //los metodo que tendra la clase estudiantes son

    consultar( req, res){
       //manejo de errores
       try {
        //mandamos a llamar todos los estudiantes
        db.query('select *from estudiantes;',
            (error,rows)=>{
                //si tengo un error en la insersion de datos
                if(error) res.status(400).send(error.message);
                //como no hay error
                res.status(200).json(rows);
            });

       } catch (error) {
        //muestro en consola el error
         console.log(error);
         //envio en json el error al cliente
         res.status(500).send(error.message);
       }
    }

//metodo de insertar estudiantes 
    ingresar(req, res){
        
       //manejo de errores
       try {
        //dame los parametros
        const{dni,nombre,apellido,email}= req.body;

        //mandamos el insert a la bas de datos
        db.query(`insert into estudiantes(dni,nombre,apellido,email) values(?,?,?,?)`
            , [dni,nombre,apellido,email],(error,rows)=>{
                //si tengo un error en la insersion de datos
                if(error) res.status(400).send(error.message);

                //como no hay error
                if(row.insertId)
                res.status(201).json({id: rows.insertId});
            });

       } catch (error) {
        //muestro en consola el error
         console.log(error);
         //envio en json el error al cliente
         res.status(500).send(error.message);
       }
    }

//metodo para actualizar estudiantes
    actualizar(req, res){

        //variable actualizar
        const {id}= req.params;
          //manejo de errores
       try {
        //dame los parametros
        const{id,dni,nombre,apellido,email}= req.body;
        //mandamos el insert a la bas de datos
        db.query(`update estudiantes set dni=?,nombre=?,apellido=?,email=? where id =?`
            , [dni,nombre,apellido,email,id],
            (error,rows)=>{
                //si tengo un error en la insersion de datos
                if(error) res.status(400).send(error.message);
                //como no hay error
                if(rows.affectedRows==1){
                    res.status(201).json({message:"registro actualizado con exito"});
                }
               
            });

       } catch (error) {
        //muestro en consola el error
         console.log(error);
         //envio en json el error al cliente
         res.status(500).send(error.message);
       }
    }

//metodo para borrar el estudiante
    borrar(req, res){
       
         //variable actualizar
         const {id}= req.params;
         //manejo de errores
      try {
       //mandamos el insert a la bas de datos
       db.query(`DELETE FROM estudiantes where id =?`
           , [id],
           (error,rows)=>{
               //si tengo un error en la insersion de datos
               if(error) res.status(400).send(error.message);
               //como no hay error
               if(rows.affectedRows==1){
                   res.status(201).json({message:"registro eliminado con exito"});
               }
              
           });

      } catch (error) {
       //muestro en consola el error
        console.log(error);
        //envio en json el error al cliente
        res.status(500).send(error.message);
      }
    }

//metodo para consultar detalles 
    consultarDetalles(req, res){
      //manejamos errores
      //selecionare del url los parametros
      const {id}= req.params;

        try {
        
            db.query(`SELECT * FROM estudiantes WHERE id = ?`, [id],
              //manejo el error o la devolucion de la llamada
                (error,row)=>{
                    //si tenemos errores
                    if(error) res.status(400).send(error.message);
                    //si no hay error
                    res.status(200).json(row[0]);
            })

       } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
       }
    }
}

//importamos una instancia de la clase
module.exports = new EstudiantesController();