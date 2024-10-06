const { request, response } = require('express')
const Autor = require('../models/autor')
//crear Autor
const crearAutor= async (req=request,res=response)=>{

    try {
        const body=req.body
        const autor= new Autor(body)
        await autor.save()
        console.log("Creado")
        return res.status(201).json(autor)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
    
}
//consultar Autors
const consultarAutor= async (req=request,res=response)=>{
    try {
        
        const autores= await Autor.find()
        return res.json(autores)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}
//consultar un Autor por id
const consultarAutorPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id

        const autor = await Autor.findById(id)
        if(!autor) {
            return res.status(404).json({mjs: 'No existe Autor'})
        }

        return res.json(autor)
    
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}


//actualizar o editar Autor
const actualizarAutor = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const {nombre,  descripcion} = req.body
        let data = {
            nombre,
            descripcion,
            
        }
        data.fechaActualizacion = new Date()
        const autor = 
            await Autor.findByIdAndUpdate(id, data, {new : false})
        return res.json(autor)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}

//deshabilitar Autor; delete logico
/*const deshabilitarAutorPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        let data = {
            enabled : false  
        }
        data.fechaActualizacion = new Date()
        const autor = 
            await Autor.findByIdAndUpdate(id, data, {new : true})
        return res.json(autor)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}*/

/*const habilitarAutorPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        let data = {
            enabled : true  
        }
        data.fechaActualizacion = new Date()
        const autor = 
            await Autor.findByIdAndUpdate(id, data, {new : true})
        return res.json(autor)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}*/


//exportar funciones
module.exports={
    crearAutor,
    consultarAutor,
    consultarAutorPorID,
    actualizarAutor
}