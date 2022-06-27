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

 app.use("/api/hospitales", require("./routes/hospitales"));

 app.use("/api/medicos", require("./routes/medicos"));

 app.use("/api/login", require("./routes/auth"));

 app.use("/api/busquedas", require("./routes/busquedas"));

 app.use("/api/upload", require("./routes/uploads"));

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});