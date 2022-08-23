// 
//  RUTA DE USUARIOS: /api/usuarios
// 
const { Router } = require("express");
const { check } = require("express-validator")
const { validarCampos } = require("../middlewares/validar-campos")
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require("../controllers/usuarios");
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_MismoUsuario } = require("../middlewares/validar-jwt");

const router = Router();


//!
//*Peticiones GET
//!

//*Get todos los usuarios
router.get("/", validarJWT, getUsuarios);

//!
//*Peticiones POST
//!

//*Creal nuevo usuario
router.post("/",
    [
        check("nombre", "El nombre es obligatorio").notEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password es obligatorio").notEmpty(),
        validarCampos,
    ],
    crearUsuario);
//!
//*Peticiones PUT
//!

//* Actualizar Usuario
router.put("/:id",
    [
        validarJWT,
        validarADMIN_ROLE_o_MismoUsuario,
        check("nombre", "El nombre es obligatorio").notEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("role", "El role es obligatorio").notEmpty(),
        validarCampos,
    ],
    actualizarUsuario);
//!
//*Peticiones DELETE
//!

//* Eliminar usuario
router.delete("/:id",
    [
        validarJWT,
        validarADMIN_ROLE
    ],
    borrarUsuario);

module.exports = router;