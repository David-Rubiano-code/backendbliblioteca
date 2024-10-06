const { request, response } = require('express')
const Libro = require('../models/libro')
const Editorial = require('../models/editorial')
const Autor = require('../models/autor')
//crear Autor
const crearLibro = async (req = request, res = response) => {
    try {
        const { codigo, titulo, ISBN, editorial, autores, paginas } = req.body;

        // Verificar si existe la editorial
        const editorialBD = await Editorial.findById(editorial._id);
        if (!editorialBD) {
            return res.status(400).json({
                msj: 'Editorial no existe'
            });
        }

        // Verificar si todos los autores existen
        const autoresBD = [];
        for (let autor of autores) {
            const autorBD = await Autor.findById(autor._id);
            if (!autorBD) {
                return res.status(400).json({
                    msj: `Autor con ID ${autor._id} no existe`
                });
            }
            autoresBD.push(autorBD._id);  // Almacenamos solo los IDs de los autores
        }

        // Preparar los datos del libro
        let data = {
            codigo,
            titulo,
            ISBN,
            editorial: editorialBD._id,  // Guardamos solo el ID de la editorial
            autores: autoresBD,          // Guardamos los IDs de los autores
            paginas
        };

        // Crear y guardar el libro
        const libro = new Libro(data);
        await libro.save();
        console.log('Libro creado');
        return res.status(201).json(libro);

    } catch (e) {
        console.log(e);
        return res.status(500).json(e);
    }
};

//consultar Libros
const consultarLibro= async (req=request,res=response)=>{
    try {
        const libros= await Libro.find()
        return res.json(libros)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
}
//consultar un Libro por id
const consultarLibroPorID = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const libro = await Libro.findById(id)
        if(!libro) {
            return res.status(404).json({mjs: 'No existe Libro'})
        }

        return res.json(libro)
    
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}


//actualizar o editar Libro
const actualizarLibro = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const {  titulo, ISBN, editorial, paginas } = req.body;
        const existeLibro = await Libro.findOne({ ISBN });

        if (existeLibro && existeLibro._id.toString() !== id) {
          return res.status(400).json({ msg: 'No se puede actualizar. Ya existe un libro con ese ISBN.' });
        }
        const editorialBD = await Editorial.findById(editorial._id);
        if (!editorialBD) {
            return res.status(400).json({
                msj: 'Editorial no existe'
            });
        }
        let data = {
            titulo,
            ISBN,
            editorial: editorialBD._id,  
            paginas
        };
        data.fechaActualizacion = new Date()
        const libro = 
            await Libro.findByIdAndUpdate(id, data, {new : false})
        return res.json(libro)
    } catch(e) {
        console.log(e)
        return res.status(500).json({e})
    }
}

module.exports={
    crearLibro,
    consultarLibro,
    consultarLibroPorID,
    actualizarLibro
}