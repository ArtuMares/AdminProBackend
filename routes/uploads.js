/*
    Ruta:
    "/api/uploads"
*/

const { Router } = require("express");
const expressFileUpload = require('express-fileupload');

const { fileUpload, getImg } = require("../controllers/uploads");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.use(expressFileUpload({
    limits: {fileSize: 5*1024*1024},
    abortOnLimit: true,
    responseOnLimit: "EL archivo no puede ser mayor a 10 megabytes" //límite de 10 megabytes
}));

//!
//*Peticiones PUT
//!

    //*Put uploads 
    router.put("/:tipo/:id", validarJWT, fileUpload);

//!
//*Peticiones GET
//!

    //*get imagen 
    router.get("/:tipo/:img", validarJWT, getImg);

    module.exports = router;
