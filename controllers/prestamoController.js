const { request, response } = require('express')
const Prestamo = require('../models/prestamo')
const Usuario=require('../models/usuario')
const Ejemplar = require('../models/ejemplar')
const Gestor = require('../models/gestor')
const schedule= require('node-schedule')
const dayjs = require('dayjs')


const job = schedule.scheduleJob(process.env.CRON, async () => {
    console.log('Actualizando multas')
    let prestamos = []
    prestamos = await Prestamo.find({ fechaDevolucion: null })
    const hoy = new Date()
    prestamos.forEach(async (prestamo) => {
        let multa = prestamo.multa
        let multaPagada = prestamo.multaPagada
        if (prestamo.fechaADevolver < hoy) {
            // TODO: Tambien se puede restar fechas y multi por 1000
            const dias = dayjs().diff(prestamo.fechaADevolver, 'day')
            multa = dias*Number(process.env.MULTA_POR_DIA)
            multaPagada = false
        }
        const cambios = {
            multa,
            multaPagada
        }
        await Prestamo.findByIdAndUpdate(prestamo._id, cambios)
    })
})

const prestarEjemplar=async(req=request,res=response)=>{
    try {
        const {ejemplar,usuario} = req.body
        const uid=req.uid
        //validacionES
        //1. usuario valido
        const usuarioBD = await Usuario.findById(usuario._id)
        if(!usuarioBD) {
        return res.status(400).json({
            msj: 'Usuario no existe'
        })
        }
        //2. que sea un ejemplar valido
        const ejemplarBD = await Ejemplar.findById(ejemplar._id)
        if(!ejemplarBD) {
            return res.status(400).json({
                msj: 'Ejemplar no existe'
            })
        }

        //3. gestor valido
        const gestorBD = await Gestor.findOne({documento : uid})
        if(!gestorBD) {
            return res.status(400).json({
                msj: 'Gestor no existe'
            })
        }
        //4. que el ejemplar no este prestado
        const prestamoPorEjemplar = await Prestamo.find({
            $and : [
                { ejemplar : ejemplarBD },
                { fechaDevolucion : null }
            ]
        })
   
        if(prestamoPorEjemplar && prestamoPorEjemplar.length > 0) {
            return res.status(400).json({
                msj: 'Este ejemplar ha sido prestado'
            })
        }
        //5. que la persona no pase el limite de prestamos
        let prestamoDBporUsuario= []
        prestamoDBporUsuario= await Prestamo.find({
            usuario:usuarioBD
        })

        const prestamosNoDevueltos=
            prestamoDBporUsuario.filter(prest =>
                prest && !prest.fechaDevolucion)
        const cantNodevueltos= prestamosNoDevueltos.length
        if(cantNodevueltos >= process.env.PRESTAMOS_MAX_SIMULTANEOS){
            return res.status(400).json({
                msj: 'El usuario ya tiene el máximo de prestamos'
            })
        }
        //6. que no tengs multas
        const prestamosConMultas = 
            prestamoDBporUsuario
                .filter(prest => (!prest.multaPagada && prest.multa > 0))
        const cantConMultas = prestamosConMultas.length
        if(cantConMultas > 0) {
            return res.status(400).json({
                msj: 'El usuario tiene una multa, no se le puede prestar'
            })
        }
        //6. horario: hora inicial y hora final
        const hoy = new Date()
        const horaActual = hoy.getHours()
        if(horaActual < process.env.HORA_INICIAL_PRESTAMO
            || horaActual > process.env.HORA_FINAL_PRESTAMOS
        ) {
            return res.status(400).json({
                msj: `Está fuera del horario de préstamos, es:
                de ${process.env.HORA_INICIAL_PRESTAMO} a ${process.env.HORA_FINAL_PRESTAMOS}`
            })
        }

        data={
            ejemplar:ejemplarBD,
            usuario:usuarioBD,
            gestor:{
                _id:gestorBD._id
            }

        }
        const prestamo= new Prestamo(data)
        await prestamo.save()
        console.log("Creado")
        return res.status(201).json(prestamo)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
    
}
const devolverEjemplar = 
    async (req = request, res = response) => {
        try {
            const uid = req.uid
            const id = req.params.id
            const gestorBD = await Gestor.findOne({documento : uid})
            if(!gestorBD) {
                return res.status(400).json({
                    msj: 'Gestor no existe'
                })
            }

            let data = {
                gestorDevolucion: gestorBD
            }

            data.fechaDevolucion = new Date()
   
            const prestamo = 
                await Prestamo.findByIdAndUpdate(id, data, {new : true})
            return res.status(201).json(prestamo)
        } catch(e) {
            console.log(e)
            return res.status(500).json({e})
        }
}

const cobrarMulta = 
    async (req = request, res = response) => {
        try {
            const uid = req.uid
            const id = req.params.id
            const gestorBD = await Gestor.findOne({documento : uid})
            if(!gestorBD) {
                return res.status(400).json({
                    msj: 'Gestor no existe'
                })
            }

            let data = {
                gestorCobra: gestorBD
            }

            data.multaPagada = true
            data.fechaCobro = new Date()
            const prestamo = 
                await Prestamo.findByIdAndUpdate(id, data, {new : true})
            return res.status(201).json(prestamo)
        } catch(e) {
            console.log(e)
            return res.status(500).json({e})
        }
}

const consultaPrestamos = async (req = request, res = response) => {
        try {
            const prestamos = await Prestamo.find()
             return res.json(prestamos)
           } catch(e) {
              console.log(e)
              return res.status(500).json({e})
          }
}

const consultaPrestamoPorUsuario = 
    async (req = request, res = response) => {
        try {
            const { id } = req.params
            const usuarioBD = await Usuario.findById(id)
            if (!usuarioBD) {
                return res.status(404).json({
                    msj: 'Usuario no encontrado'
                })
            }
            const prestamos = await Prestamo.find({ usuario: usuarioBD._id })
            return res.json(prestamos)
        } catch (e) {
            console.log(e)
            return res.status(500).json({ e })
        }
    }

const consultaPrestamosPorUsuarioYEstado = 
    async (req = request, res = response) => {
    try {
       const { id, estado } = req.params
       const usuarioBD = await Usuario.findById(id)
       const fechaDevolucion = 
        (estado === 'activo') ? { $ne : null } : null // op. ternario
       if(!usuarioBD) {
        return res.status(400).json({
            msj: 'Usuario no existe'
        })
       }
       const prestamos = await Prestamo.find({
            usuario : usuarioBD,
            fechaDevolucion
        })
       return res.json(prestamos)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    } 
}   

module.exports = {
    prestarEjemplar,
    devolverEjemplar,
    consultaPrestamos,
    cobrarMulta,
    consultaPrestamoPorUsuario,
    consultaPrestamosPorUsuarioYEstado
}