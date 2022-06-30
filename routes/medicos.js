/*
    ruta:
    "/api/medicos"
*/

const { Router } = require("express");
const { check } = require("express-validator")
const { validarCampos } = require("../middlewares/validar-campos")
const { getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico} = require("../controllers/medicos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();


//!
//*Peticiones GET
//!

    //*Get todos los medicos
    router.get("/",  getMedicos);

//!
//*Peticiones POST
//!

    //*Crear nuevo medico
    router.post("/",
        [
            validarJWT,
            check("nombre", "El nombre del médico es obligatotio").notEmpty(),
            check("hospital", "El hospital id debe de ser válido").isMongoId(),
            validarCampos
        ],
        crearMedico);
//!
//*Peticiones PUT
//!

    //* Actualizar medicos
    router.put("/:id",
        [   
            validarJWT,
            check("nombre", "El nombre del médico es obligatotio").notEmpty(),
            check("hospital", "El hospital id debe de ser válido").isMongoId(),
            validarCampos
        ],
        actualizarMedico);
//!
//*Peticiones DELETE
//!

    //* Eliminar medico
    router.delete("/:id",
    [
        validarJWT
    ],
    borrarMedico);

    module.exports = router;
