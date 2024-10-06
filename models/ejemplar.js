const { Schema,model} = require("mongoose")
const EjemplarSchema =Schema({

        codigo:{
        type:String,
        required:true,
        unique:[true,'Codigo Ejemplar ya existe']
         },
        localizacion:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'Localizacion'  
        },
        libro:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'Libro'  
            
        },
        //datos de auditoria
        fechaCreacion:{
            type:Date,
            default: new Date()
        },
        fechaActualizacion:{
            type:Date,
            
        },
       

})

module.exports=model('Ejemplar',EjemplarSchema)

