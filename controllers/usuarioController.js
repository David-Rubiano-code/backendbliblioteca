const { request, response } = require('express')
const Usuario = require('../models/usuario')
//crear usuario
const crearUsuario= async (req=request,res=response)=>{

    try {
        const body=req.body
        const usuario= new Usuario(body)
        await usuario.save()
        console.log("Creado")
        return res.status(201).json(usuario)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
    
}
//consultar usuarios
const consultarUsuario= async (req=request,res=response)=>{
    try {
        const usuarios= await Usuario.find()
        return res.json(usuarios)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}
//consultar un usuario por id
const consultarUsuarioPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const usuario = await Usuario.findById(id)
        if(!usuario) {
            return res.status(404).json({mjs: 'No existe usuario'})
        }

        return res.json(usuario)
    
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}


//actualizar o editar usuario
const actualizarUsuario = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const {nombre, telefono, direccion} = req.body
        let data = {
            nombre,
            telefono,
            direccion
        }
        data.fechaActualizacion = new Date()
        const usuario = 
            await Usuario.findByIdAndUpdate(id, data, {new : false})
        return res.json(usuario)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}

//deshabilitar usuario; delete logico
const deshabilitarUsuarioPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        let data = {
            enabled : false  
        }
        data.fechaActualizacion = new Date()
        const usuario = 
            await Usuario.findByIdAndUpdate(id, data, {new : true})
        return res.json(usuario)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}

/*const habilitarUsuarioPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        let data = {
            enabled : true  
        }
        data.fechaActualizacion = new Date()
        const usuario = 
            await Usuario.findByIdAndUpdate(id, data, {new : true})
        return res.json(usuario)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}*/


//exportar funciones
module.exports={
    crearUsuario,
    consultarUsuario,
    consultarUsuarioPorID,
    actualizarUsuario,
    deshabilitarUsuarioPorID,
   /* habilitarUsuarioPorID
*/
}