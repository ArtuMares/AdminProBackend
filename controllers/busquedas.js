const { response } = require("express");
const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

const getTodo = async (req, res = response) => {
    const filtro = req.params.search;
    const regex = new RegExp(filtro, "i");

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);
    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
}

const getDocumentosCollection = async (req, res = response) => {
    const filtro = req.params.search;
    const tabla = req.params.tabla;
    const regex = new RegExp(filtro, "i");

    let data=[];

    switch (tabla) {
        case "medicos":
            data = await Medico.find({nombre: regex})
                                    .populate("usuario", "nombre, img")
                                    .populate("hospital", "nombre, img");
            break;
        case "hospitales":
            data = await Hospital.find({nombre: regex})
                                    .populate("usuario", "nombre img");
            break;
        case "usuarios":
            data = await Usuario.find({nombre: regex});
            break;
        default: 
        return res.status(400).json({
            ok:false,
            msg: "La tabla tiene que ser usuarios/hospitales/medicos"
        })
    }
    res.json({
        ok: true,
        resultados: data
    });
}

module.exports = {
    getTodo,
    getDocumentosCollection
}