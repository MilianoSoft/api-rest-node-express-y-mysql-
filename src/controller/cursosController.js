//accedo a la base de datos directamente
const db = require('../database/conexion');

//creo la clase estudiante
class cursosController {

    //toda clase tiene un constructor
    constructor() {

    }

    //los metodo que tendra la clase curso son

    consultar(req, res) {
        //manejo de errores
        try {
            //mandamos a llamar todos los curso
            db.query('select *from curso;',
                (error, rows) => {
                    //si tengo un error en la insersion de datos
                    if (error) res.status(400).send(error.message);
                    //como no hay error
                    if (rows.length) {
                        res.status(200).json(rows);
                    } else {
                        res.status(200).json({ message: "no se encontro filas para esta peticion" });
                    }

                });

        } catch (error) {
            //muestro en consola el error
            console.log(error);
            //envio en json el error al cliente
            res.status(500).send(error.message);
        }
    }

    //metodo de insertar curso 
    ingresar(req, res) {

        //manejo de errores
        try {
            //dame los parametros
            const { nombre, descripcion, profesorId } = req.body;

            //mandamos el insert a la bas de datos
            db.query(`insert into curso(nombre,descripcion,profesorId) values(?,?,?);`
                , [nombre, descripcion, profesorId], (error, rows) => {
                    //si tengo un error en la insersion de datos
                    if (error) res.status(400).send(error.message);
                    //como no hay error
                    if (rows.insertId) {
                        res.status(201).json({ message: "registro creado con exito" });
                    }
                });

        } catch (error) {
            //muestro en consola el error
            console.log(error);
            //envio en json el error al cliente
            res.status(500).send(error.message);
        }
    }

    //metodo para actualizar curso
    actualizar(req, res) {

        //variable actualizar
        const { id } = req.params;
        //manejo de errores
        try {
            //dame los parametros
            const { nombre, descripcion, profesorId } = req.body;
            //validacion del parametro del profesor

            //mandamos el insert a la bas de datos
            db.query(`update curso set nombre=?,descripcion=?,profesorId=? where id =?`
                , [nombre, descripcion, profesorId, id],
                (error, rows) => {
                    //si tengo un error en la insersion de datos
                    if (error){
                        res.status(400).send(error.message);
                    }
                    else if (rows.affectedRows>0){
                        res.status(200).json({message:"actulizado con exito"});
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
    borrar(req, res) {

        //variable actualizar
        const { id } = req.params;
        //manejo de errores
        try {
            //mandamos el insert a la bas de datos
            db.query(`DELETE FROM curso where id =?`
                , [id],
                (error, rows) => {
                    //si tengo un error en la insersion de datos
                    if (error) res.status(400).send(error.message);
                    //como no hay error
                    if (rows.affectedRows == 1) {
                        res.status(201).json({ message: "registro eliminado con exito" });
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
    consultarDetalles(req, res) {
        //manejamos errores
        //selecionare del url los parametros
        const { id } = req.params;

        try {

            db.query(`SELECT * FROM curso WHERE id = ?`, [id],
                //manejo el error o la devolucion de la llamada
                (error, rows) => {
                    //si tenemos errores
                    if (error) {
                        res.status(400).send(error.message)
                    }
                    //como no hay error
                    else {
                         if(rows.length){
                            res.status(200).json(rows);
                         }else{
                            res.status(200).json({message:"verica el id enviado que sea valido"});
                         }
                    }
                })

        } catch (error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    }

    //asociar estudiantes con cursos

    asociarEstudianteCurso(req,res){
         //manejador de errores
        try {
            const {estudianteId,cursoId}= req.body;
            db.query(`INSERT INTO estudiantecurso(estudianteId,cursosId) VALUES(?,?)`,[estudianteId,cursoId],
                (error,rows)=>{
                    if(error){
                        res.status(400).json(error.message);
                    }else{
                        //debemos tener las fila afectadas 
                        if(rows.affectedRows==1){
                            res.status(200).json(rows);
                        }else{
                            res.status(200).json({message:"verifica que el id del curso y estudiantes sean validos"});
                        }
                    }
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json(error.message);
        }
    }
}

//importamos una instancia de la clase
module.exports = new cursosController();