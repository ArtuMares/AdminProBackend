const fs = require("fs")

const Hospital = require("../models/hospital")
const Medico = require("../models/medico")
const Usuario = require("../models/usuario")

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        //borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {

    let pathViejo="";

    switch (tipo) {
        case "medicos":
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log("no se encontró un médico con ese id");
                return false;
            }
            pathViejo = `./uploads/medicos/${medico.img}`
            borrarImagen(pathViejo);
            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;
        case "hospitales":
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log("no se encontró un hospital con ese id");
                return false;
            }
            pathViejo = `./uploads/hospitales/${hospital.img}`
            borrarImagen(pathViejo);
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;
        case "usuarios":
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log("no se encontró un usuario con ese id");
                return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`
            borrarImagen(pathViejo);
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
        default:


    }
}

module.exports = {
    actualizarImagen
}