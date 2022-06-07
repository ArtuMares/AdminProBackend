require("dotenv").config();

const express = require("express");
const cors = require('cors')
const {dbconnection} = require("./database/config");


//MEAN_USER
//WnxTRIdYEdynzzRF
//*Crear el servidor de express()
const  app = express();

//*Configurar Cors
app.use(cors());

//*Lectura y parseo del body
app.use(express.json());

//*Base de datos
dbconnection();

//*Rutas
 app.use("/api/usuarios", require("./routes/usuarios"));

 app.use("/api/login", require("./routes/auth"));





app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});