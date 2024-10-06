const { request, response } = require('express')
const Localizacion = require('../models/localizacion')
//crear Localizacion
const crearLocalizacion= async (req=request,res=response)=>{

    try {
        const body=req.body
        const localizacion= new Localizacion(body)
        await localizacion.save()
        console.log("Creado")
        return res.status(201).json(localizacion)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
    
}
//consultar Localizacions
const consultarLocalizacion= async (req=request,res=response)=>{
    try {
        const localizaciones= await Localizacion.find()
        return res.json(localizaciones)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}
//consultar un Localizacion por id
const consultarLocalizacionPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const localizacion = await Localizacion.findById(id)
        if(!localizacion) {
            return res.status(404).json({mjs: 'No existe Localizacion'})
        }

        return res.json(localizacion)
    
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}


//actualizar o editar Localizacion
const actualizarLocalizacion = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const {seccion,  estanteria} = req.body
        let data = {
            seccion,
            estanteria
        }
        data.fechaActualizacion = new Date()
        const localizacion = 
            await Localizacion.findByIdAndUpdate(id, data, {new : false})
        return res.json(localizacion)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}

//deshabilitar Localizacion; delete logico
/*const deshabilitarLocalizacionPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        let data = {
            enabled : false  
        }
        data.fechaActualizacion = new Date()
        const localizacion = 
            await Localizacion.findByIdAndUpdate(id, data, {new : true})
        return res.json(localizacion)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}

/*const habilitarLocalizacionPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        let data = {
            enabled : true  
        }
        data.fechaActualizacion = new Date()
        const localizacion = 
            await Localizacion.findByIdAndUpdate(id, data, {new : true})
        return res.json(localizacion)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}*/


//exportar funciones
module.exports={
    crearLocalizacion,
    consultarLocalizacion,
    consultarLocalizacionPorID,
    actualizarLocalizacion,
    //deshabilitarLocalizacionPorID,
   /* habilitarLocalizacionPorID
*/
}