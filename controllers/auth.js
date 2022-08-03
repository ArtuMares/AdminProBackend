const bcrypt = require("bcryptjs");
const { response } = require("express");
const { googleVerify } = require("../helpers/google-verify");
const { generarJWT } = require("../helpers/JWT");
const Usuario  = require("../models/usuario")

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({email});
        //Verificar email 
        if (!usuarioDB){
            return res.status(402).json({
                ok:false,
                msg: "email no encontrado"
            });
        }
        //Verificar contraseña 
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword){
            return res.status(402).json({
                ok: false,
                msg: "La contraseña no es válida"
            });
        }
        //Generar JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        });
    }

};
const googleSignIn = async (req, res = response) => {

    try {
        const {email, name, picture} = await googleVerify(req.body.token);

        const usuarioDB = await Usuario.findOne({email});
        let usuario;

        if (!usuarioDB){//Si no existe el usuario en la BD, crea uno nuevo con la bandera de google en true
            usuario = new Usuario({
                nombre: name,
                email,
                password: "@@@",
                img: picture,
                google: true
            })
        }else{//si hay un usuario, toma a ese usuario de la base de datos
            usuario = usuarioDB;
            usuario.google = true;   
        }

        //Guardar usuario
        await usuario.save();

         //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            email, name, picture,
            token
        });
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: "token de google no es correcto"
        });
    }


}

const renewToken = async (req, res = response) =>{
    const uid = req.uid;
    const usuario = await Usuario.findById(uid);
    const token = await generarJWT(uid);
    res.json({
        ok: true,
        token,
        usuario
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}