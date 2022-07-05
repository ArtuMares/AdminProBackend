//!
// *Path: "api/login"
// !
const { Router } = require("express");
const { check } = require("express-validator");

const { login, googleSignIn, renewToken,  } = require("../controllers/auth");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router();

//*Login

router.post("/",
    [
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password es obligatorio").notEmpty(),
        validarCampos
    ]
    , login);

//*Login con google
router.post("/google",
    [
        check("token", "El token de google es obligatorio").notEmpty(),
        validarCampos
    ]
    , googleSignIn);

//*renovar roken
router.get("/renew",
[
    validarJWT
]
, renewToken);

module.exports = router;