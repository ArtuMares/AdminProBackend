
const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const {generarJWT} = require("../helpers/JWT")

const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0; 

    const [usuarios, total] = await Promise.all([
        Usuario.find({}, "nombre email role google img").skip(desde).limit(5),
        Usuario.countDocuments()
    ])

    res.json({
        ok: true,
        usuarios,
        total
    })
};

const crearUsuario = async (req, res = response) => {

    const { password, email } = req.body;



    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El correo ya está registrado"
            })
        }


        const usuario = new Usuario(req.body);


        //Encriptar constraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar usuario
        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs"
        })
    }

};

const actualizarUsuario = async (req, res = response) => {
    //TODO validar token y comprobar sii es un usuario válido

    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(402).json({
                ok: false,
                msg: "No existe un usuario con ese id"
            });
        }
        //*Actualizar el usuario
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {
            const ExisteEmail = await Usuario.findOne({ email });
            if (ExisteEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un usuario con ese email"
                })
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        });
    }
}

const borrarUsuario = async (req, res = response) => {
    const uid = req.params.id

    try {
        //Buscar que exista el usuario
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(402).json({
                ok: false,
                msg: "No existe un usuario con ese id"
            });
        }
        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: "Usuario eliminado"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "Error inesperado "
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}