const {Router} = require('express')
const {crearAutor,
    consultarAutor,
    consultarAutorPorID,
    actualizarAutor,
  }=require('../controllers/autorController')
const { validarToken } = require('../middlewares/validar-token')
const router = Router()
//get, post, put,patch, delete

router.post('/',[validarToken],crearAutor)
router.get('/',[validarToken], consultarAutor)
router.get('/:id',[validarToken], consultarAutorPorID)
router.put('/:id',[validarToken], actualizarAutor)

/*router.patch('/:id/enabled',habilitarAutorPorID)*/
module.exports=router