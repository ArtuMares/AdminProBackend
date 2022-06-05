require("dotenv").config();

const express = require("express");
const cors = require('cors')
const {dbconnection} = require("./database/config");

//MEAN_USER
//WnxTRIdYEdynzzRF
//*Crear el servidor de express()
const  app= express();

//*Configurar Cors
app.use(cors())

//*Base de datos
dbconnection();

//*Rutas
app.get("/", (req, res) =>{
    res.json({
        ok:true,
        msg: "Hola mundo"
    })
});



app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});