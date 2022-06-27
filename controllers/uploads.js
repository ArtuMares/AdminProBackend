const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = (req, res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;

    //*Validar tipo
    const tiposValidos = ["hospitales", "usuarios", "medicos"];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: "No es tipo un usuario, médico u hospital"
        });
    }

    //*validar que exista el archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: "No se subió ningún archivo"
        });
    }

    //*procesar la imagen
    const file = req.files.imagen

    const nombreCortado = file.name.split(".");
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    //Validar extensión
    const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: "el tipo de archivo tiene que ser png/jpg/jpeg/gif"
        })
    };
    //Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //*path para guardar imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`

    //*Mover/guardar la imagen
    file.mv(path, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: "Error al mover o guardar la imagen"
            });
        }
        res.json({
            ok: true,
            msg: "archivo subido",
            nombreArchivo,
            path
        });
    });
    
    //*Actualizar la BD
    actualizarImagen(tipo, id, nombreArchivo);
}

const getImg = (req, res= response)=>{
    const tipo= req.params.tipo;
    const img= req.params.img;
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${img}`);
    //Imagen por defecto
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
}

module.exports = {
    fileUpload,
    getImg
};