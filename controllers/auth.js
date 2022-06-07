const bcrypt = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/JWT");
const Usuario  = require("../models/usuario")

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({email});
        //Verificar email 
        if (!usuarioDB){
            res.status(402).json({
                ok:false,
                msg: "email no encontrado"
            })
        }
        //Verificar contraseña 
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword){
            res.status(402).json({
                ok: false,
                msg: "La contraseña no es válida"
            })
        }
        //Generar JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        });
    }

};

module.exports = {
    login
}