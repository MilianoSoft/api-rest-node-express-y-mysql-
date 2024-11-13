//accedo a la base de datos directamente
const db = require('../database/conexion');
//creo la clase profesor
class profesoresController{

    //toda clase tiene un constructor
    constructor(){

    }

    //los metodo que tendra la clase profesor son

    consultar( req, res){
       //manejo de errores
       try {
        //mandamos a llamar todos los profesor
        db.query('select *from profesor;',
            (error,rows)=>{
                //si tengo un error en la insersion de datos
                if(error) res.status(400).send(error.message);
                //como no hay error
                res.status(200).json(rows);
            });

       } catch (error) {
        //muestro en consola el error
         console.log(error.message);
         //envio en json el error al cliente
         res.status(500).send(error.message);
       }
    }

//metodo de insertar profesor 
    ingresar(req, res){
        
       //manejo de errores
       try {
        //dame los parametros
        const{dni,nombre,apellido,email,profesion,telefono}= req.body;

        //mandamos el insert a la bas de datos
        db.query(`insert into profesor(dni,nombre,apellido,email,profesion,telefono) 
                  values(?,?,?,?,?,?);`
            , [dni,nombre,apellido,email,profesion,telefono],
            (error,rows)=>{
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

//metodo para actualizar profesor
    actualizar(req, res){

        //variable actualizar
        const {id}= req.params;
          //manejo de errores
       try {
        //dame los parametros
        const{dni,nombre,apellido,email,profesion,telefono}= req.body;
        //mandamos el insert a la bas de datos
        db.query(` update profesor 
                   set 
                   dni=?,nombre=?,apellido=?,email=?,profesion=?,telefono=?
                   where id =?;`
            , [dni,nombre,apellido,email,profesion,telefono,id],
            (error,rows)=>{
                //si tengo un error en la insersion de datos
                if(error){
                   
                    res.status(400).send(error.message);
                }
                else{
                   if(rows.affectedRows>0){
                    res.status(200).json({message:"registro actualizado con exito"});
                   }else{
                    res.status(200).json({message:"no se pudo actualizar el registro, vefica que envias un id valido "});
                   }
                }
               
            });

       } catch (error) {
        //muestro en consola el error
         console.log(error.message);
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
       db.query(`DELETE FROM profesor where id =?`
           , [id],
           (error,rows)=>{
               //si tengo un error en la insersion de datos
               if(error){
                 res.status(400).json(error.message);
               }else{
                      if(rows.affectedRows>0){
                        res.status(200).json({message:"registro eliminado con exito"});
                      }else{
                        res.status(200).json({message:"verica los campos enviados, puede que este id no sea valido"});
                      }
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
        
            db.query(`SELECT * FROM profesor WHERE id = ?`, [id],
              //manejo el error o la devolucion de la llamada
                (error,row)=>{
                    //si tenemos errores
                    if(error){
                        res.status(400).json(error.message);
                    }else{
                        if(row.length){
                            res.status(200).json(row);
                        }else{
                            res.status(200).json({message:"verifica los campos sean valido o el id que estas enviando"});
                        }
                    }
            })

       } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
       }
    }
}

//importamos una instancia de la clase
module.exports = new profesoresController();