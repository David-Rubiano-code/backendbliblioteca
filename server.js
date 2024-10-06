const app= require('./app')
app.set('port',process.env.PORT || 3002)
app.listen(app.get('port'),()=>{
    console.log('Arranco por el puerto ' + app.get('port'))
})