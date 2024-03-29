/*
    Ruta:
    "/api/hospitales"
*/ 
const { Router } = require("express");
const { check } = require("express-validator")
const { validarCampos } = require("../middlewares/validar-campos")
const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
 } = require("../controllers/hospitales");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();


//!
//*Peticiones GET
//!

    //*Get todos los hospitales
    router.get("/", validarJWT,  getHospitales);

//!
//*Peticiones POST
//!

    //*Creal nuevo hospital
    router.post("/",
        [
            validarJWT,
            check("nombre", "El nombre del hospital es necesario").notEmpty(),
            validarCampos
        ],
        crearHospital);
//!
//*Peticiones PUT
//!

    //* Actualizar Hospital
    router.put("/:id",
        [   
            validarJWT,
            check("nombre", "El nombre del hospital es necesario").notEmpty(),
            validarCampos
        ],
        actualizarHospital);
//!
//*Peticiones DELETE
//!

    //* Eliminar Hospital
    router.delete("/:id",
        validarJWT,
        borrarHospital);

    module.exports = router;
