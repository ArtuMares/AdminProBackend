//!
// *Path: "api/login"
// !
const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");


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

module.exports = router;