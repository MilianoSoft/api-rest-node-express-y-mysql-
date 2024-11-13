//incorporamos mysql2
const mysql=require('mysql2')

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'cursos'
})

//verificamos si hubo conexion
db.connect((err)=>{
    if(err){
        throw err;
    }else{
        console.log('conexion exitosa');
    }
});

//esporto este pequenio modulo o archivo

module.exports = db;



