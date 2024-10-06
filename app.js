const dotenv = require('dotenv')//Importar dotenv para que arranque el puerto
dotenv.config()
const express= require('express')
const app = express()
const cors =require('cors')
const {mongoConnect}=require('./databases/config')
mongoConnect()
//middlewares
app.use(cors({
    origin:'*',
    methods:['GET','POST','PUT','PATCH','OPTIONS'],
    allowedHeaders:['Content-Type','token','Authorization'],
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
//rutas
const usuarios = require('./routes/usuario')
const localizacions = require('./routes/localizacion')
const editorials = require('./routes/editorial')
const autores = require('./routes/autor')
const libros = require('./routes/libro')
const ejemplares = require('./routes/ejemplar')
const gestores = require('./routes/gestor')
const prestamos = require('./routes/prestamo')

app.use('/api/v1/usuarios',usuarios)
app.use('/api/v1/localizacions',localizacions)
app.use('/api/v1/editorials',editorials)
app.use('/api/v1/autors',autores)
app.use('/api/v1/libros',libros)
app.use('/api/v1/ejemplars',ejemplares)
app.use('/api/v1/gestores',gestores)
app.use('/api/v1/prestamos', prestamos)

app.get('*', (req, res) => {
    return res.status(404).json({
        msj: 'Enlace no encontrado',
        status: 404
    })
})
module.exports=app

