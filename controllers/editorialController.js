const { request, response } = require('express')
const Editorial = require('../models/editorial')
//crear Editorial
const crearEditorial= async (req=request,res=response)=>{

    try {
        const body=req.body
        const editorial= new Editorial(body)
        await editorial.save()
        console.log("Creado")
        return res.status(201).json(editorial)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
    
}
//consultar Editorials
const consultarEditorial= async (req=request,res=response)=>{
    try {
        const editoriales= await Editorial.find()
        return res.json(editoriales)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}
//consultar un Editorial por id
const consultarEditorialPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const editorial = await Editorial.findById(id)
        if(!editorial) {
            return res.status(404).json({mjs: 'No existe Editorial'})
        }

        return res.json(editorial)
    
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}


//actualizar o editar Editorial
const actualizarEditorial = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const {nombre,  descripcion} = req.body
        let data = {
            nombre,
            descripcion
        }
        data.fechaActualizacion = new Date()
        const editorial = 
            await Editorial.findByIdAndUpdate(id, data, {new : false})
        return res.json(editorial)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}

//deshabilitar Editorial; delete logico
/*const deshabilitarEditorialPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        let data = {
            enabled : false  
        }
        data.fechaActualizacion = new Date()
        const editorial = 
            await Editorial.findByIdAndUpdate(id, data, {new : true})
        return res.json(editorial)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}

const habilitarEditorialPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        let data = {
            enabled : true  
        }
        data.fechaActualizacion = new Date()
        const editorial = 
            await Editorial.findByIdAndUpdate(id, data, {new : true})
        return res.json(editorial)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}*/


//exportar funciones
module.exports={
    crearEditorial,
    consultarEditorial,
    consultarEditorialPorID,
    actualizarEditorial,
    /*deshabilitarEditorialPorID,*/
   /* habilitarEditorialPorID
*/
}