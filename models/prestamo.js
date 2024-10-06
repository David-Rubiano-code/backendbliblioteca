const { Schema,model} = require("mongoose")
const dayjs = require('dayjs')
const PrestamoSchema =Schema({

        ejemplar:{
            type:Schema.Types.ObjectId,
            ref:'Ejemplar',
            required:true
         },
        usuario:{
            type:Schema.Types.ObjectId,
            ref:'Usuario',
            required:true        
        },
        
        fechaPrestamo:{
            type:Date,
            default: new Date()
        },
        fechaADevolver:{
            type:Date,
            //cacular con 15+ dias
            default: dayjs().add(15, 'day')
        },
        fechaDevolucion:{
            type:Date,
            
        },
        gestor:{
            type:Schema.Types.ObjectId,
            ref:'Gestor',
            required:true   
        },
        multa:{
            type:Number,
            //se calcula TODOS LOD DIAS A LAS:00:00
            default:0
        },
        multaPagada:{
            type:Boolean,
            default:true

        },
        gestorDevolucion : {
            type: Schema.Types.ObjectId,
            ref: 'Gestor'
        },
        gestorCobra : {
            type: Schema.Types.ObjectId,
            ref: 'Gestor'
        },
        fechaCobro : {
            type: Date
        }
       

})

module.exports=model('Prestamo',PrestamoSchema)

