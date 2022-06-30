const {response}  = require("express");

const Medico = require("../models/medico");

const getMedicos = async(req, res = response) =>{

    const medicos= await Medico.find().populate("usuario", "nombre").populate("hospital", "nombre");

    res.json({
        ok: true,
        medicos
    })
}

const crearMedico = async(req, res = response) =>{
    const uid= req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
    try {
        const MedicoDB = await medico.save();
        res.json({
            ok: true,
            medico: MedicoDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Contacte al administrador"
        })
    }
    
}

const actualizarMedico = async (req, res = response) =>{
    const id = req.params.id;
    const uid= req.uid;
    try {
        const medicoDB = await Medico.findById(id);
        if(!medicoDB){
           return res.status(404).json({
                ok: false,
                msg: "No existe un médico con ese id"
            })
        };
        const cambiosMedico = {...req.body, usuario: uid};
         
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true});

        res.json({
            ok: true,
            msg: "medico actualizado",
            medico: medicoActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Contacte al administrador"
        })
    }
}
const borrarMedico = async(req, res = response) =>{
    const id = req.params.id;
    try {
        const medicoDB = await Medico.findById(id);
        if(!medicoDB){
           return res.status(404).json({
                ok: false,
                msg: "No existe un médico con ese id"
            })
        };
        const hospitalEliminado = await Medico.findByIdAndDelete( id );
        res.json({
            ok: true,
            msg: "Médico eliminado"
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Contacte al administrador"
        })
    }
}



module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}