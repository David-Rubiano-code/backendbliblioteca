const { request, response } = require('express')
const Gestor = require('../models/gestor')
const bcryptjs = require('bcryptjs')
const { generarToken } = require('../utils/generar-token')
const crearGestor= async(req=request,res=response)=>{
    try {
        const {documento,nombre,password}=req.body
        const data={
            documento,
            nombre,
            password
        }
        const gestor= new Gestor(data)
        //encriptar contraseña
        const salt = bcryptjs.genSaltSync()
        console.log(salt)
        gestor.password=bcryptjs.hashSync(password, salt)
        console.log(gestor.password)
        gestor.enabled=true

        const gestorBD=  await Gestor.findOne({documento})
        if(gestorBD){
            return res.status(201).json({msj :'ya existe es gestor con ese documento'})
        }
        await gestor.save()
        console.log("Creado")
        return res.status(201).json(gestor)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}

const loguear= async(req=request,res=response)=>{
    const{documento,password}=req.body
    const gestorBD= await Gestor.findOne({
        documento
    })
    if(!gestorBD){
        return res.status(401).json({msj:' No existe usuario'})
    }
    if(!gestorBD.enabled){
        return res.status(401).json({msj:'usuario deshabilitado'})
    }
    const passwordEsValido=bcryptjs.compareSync(password,gestorBD.password)
    if(!passwordEsValido){
        return res.status(400).json({msj:'Credenciales invalidas'})
    }
    const token= await generarToken(documento)
    return res.json(
        {
            gestorBD,
            token
        }
    )
}



module.exports={
  crearGestor,
  loguear
}