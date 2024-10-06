const mongoose = require('mongoose')

const mongoConnect = async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI,{
            dbName:'biblioteca-iud'
        })
        console.log('Successful Conection')
        
    } catch (e) {
        console.log('Connetion Error',e)
        throw new Error('Connetion Error')
    }
    
}
module.exports={mongoConnect}