const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario")

const validarJWT = (req, res, next) =>{
    //Leer el token
    const token = req.header("x-token");

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la petición"
        });
    }
    try {
        
        const {uid}= jwt.verify(token, process.env.JWT_KEY );
        req.uid= uid;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token no es válido"
        });
    }
}

const validarADMIN_ROLE = (req, res,next) =>{
    const uid = req.uid;
    try {
        const usuarioDB = Usuario.findById(uid);
        if(!usuarioDB){ 
            return res.json(404).json({ok:false, msg: "El usuario no existe"})
        }

        if(usuarioDB.role !== "ADMIN_ROLE"){
            return res.status(403).json({ok:false, msg: "No cuenta con los privilegios para esa acción"})
        }

        next();
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
}
const validarADMIN_ROLE_o_MismoUsuario = (req, res,next) =>{
    const uid = req.uid;
    const id = req.params.id;
    try {
        const usuarioDB = Usuario.findById(uid);
        if(!usuarioDB){ 
            return res.json(404).json({ok:false, msg: "El usuario no existe"})
        }

        if(usuarioDB.role === "ADMIN_ROLE" || uid === id){
            next();   
        }else{
            return res.status(403).json({ok:false, msg: "No cuenta con los privilegios para esa acción"})
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
}


module.exports= {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
}