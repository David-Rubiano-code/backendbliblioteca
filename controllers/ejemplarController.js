const { request, response } = require('express')
const Ejemplar = require('../models/ejemplar')
const Libro = require('../models/libro')
const Localizacion = require('../models/localizacion')

//crear ejemplar
const crearEjemplar= async (req=request,res=response)=>{

    try {
        const { codigo, localizacion, libro } = req.body;
        const localizacionBD = await Localizacion.findById(localizacion._id);
        const libroBD = await Libro.findById(libro._id);
        if (!localizacionBD) {
            return res.status(400).json({
                msj: 'localizacion no existe'
            });
        }
        if (!libroBD) {
            return res.status(400).json({
                msj: 'libro no existe'
            });
        }
        let data = {
            codigo,
            localizacion: localizacionBD._id,  
            libro: libro._id,      
         
        };
        const ejemplar= new Ejemplar(data)
        await ejemplar.save()
        console.log("Creado")
        return res.status(201).json(ejemplar)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
    
}
//consultar ejemplars
const consultarEjemplar= async (req=request,res=response)=>{
    try {
        
        const ejemplares= await Ejemplar.find()
        return res.json(ejemplares)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}
//consultar un ejemplar por id
const consultarEjemplarPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id

        const ejemplar = await Ejemplar.findById(id)
        if(!ejemplar) {
            return res.status(404).json({mjs: 'No existe Ejemplar'})
        }

        return res.json(ejemplar)
    
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}


//actualizar o editar ejemplar
const actualizarEjemplar = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const { codigo, localizacion, libro } = req.body;
        const localizacionBD = await Localizacion.findById(localizacion._id);
        const libroBD = await Libro.findById(libro._id);
        if (!localizacionBD) {
            return res.status(400).json({
                msj: 'localizacion no existe'
            });
        }
        if (!libroBD) {
            return res.status(400).json({
                msj: 'libro no existe'
            });
        }
        let data = {
            codigo,
            localizacion: localizacionBD._id,  
            libro: libro._id,      
         
        };
        data.fechaActualizacion = new Date()
        const ejemplar = 
            await Ejemplar.findByIdAndUpdate(id, data, {new : false})
        return res.json(ejemplar)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}

//deshabilitar ejemplar; delete logico
/*const deshabilitarejemplarPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        let data = {
            enabled : false  
        }
        data.fechaActualizacion = new Date()
        const ejemplar = 
            await ejemplar.findByIdAndUpdate(id, data, {new : true})
        return res.json(ejemplar)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}*/

/*const habilitarejemplarPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        let data = {
            enabled : true  
        }
        data.fechaActualizacion = new Date()
        const ejemplar = 
            await ejemplar.findByIdAndUpdate(id, data, {new : true})
        return res.json(ejemplar)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}*/


//exportar funciones
module.exports={
    crearEjemplar,
    consultarEjemplar,
    consultarEjemplarPorID,
    actualizarEjemplar
}