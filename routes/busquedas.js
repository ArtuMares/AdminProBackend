/*
    Ruta:
    "/api/busquedas"
*/

const { Router } = require("express");
const { getTodo, getDocumentosCollection } = require("../controllers/busquedas");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();


//!
//*Peticiones GET
//!

    //*Get todos 
    router.get("/:search", [validarJWT] ,  getTodo);

    router.get("/coleccion/:tabla/:search", validarJWT, getDocumentosCollection)

    module.exports = router;
