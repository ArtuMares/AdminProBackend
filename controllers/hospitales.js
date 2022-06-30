const {response}  = require("express");
const Hospital = require("../models/hospital") 



const getHospitales = async(req, res = response) =>{

    const hospitales = await Hospital.find().populate("usuario", "nombre img");

    res.json({
        ok: true,
        hospitales
    })
}

const crearHospital = async(req, res = response) =>{
    const uid= req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });
    try {

        const HospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: HospitalDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
}

const actualizarHospital = async (req, res = response) =>{
    const id = req.params.id;
    const uid = req.uid;
    try {
        const HospitalDB = await Hospital.findById(id);
        if (!HospitalDB){
            return res.status(404).json({
                ok: false,
                msg: "No se encontró un hospital con ese id"
            });
        }
        const cambiosHospital = { ...req.body, usuario: uid};

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, {new: true} );

        res.json({
            ok: true,
            msg: "Actualizar hospital",
            id,
            hospital: hospitalActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })    
    }
}
const borrarHospital = async (req, res = response) =>{
    const id = req.params.id;
    try {
        const HospitalDB = await Hospital.findById(id);
        
        if (!HospitalDB){
            return res.status(404).json({
                ok: false,
                msg: "No se encontró un hospital con ese id"
            });
        }
        const hospitalEliminado = await Hospital.findByIdAndDelete( id );
        res.json({
            ok: true,
            msg: "Hospital eliminado"
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })    
    }
}



module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}