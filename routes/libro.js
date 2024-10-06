const {Router} = require('express')
const {crearLibro,
    consultarLibro,
    consultarLibroPorID,
    actualizarLibro,
  }=require('../controllers/libroController')
  const { validarToken } = require('../middlewares/validar-token')
const router = Router()
//get, post, put,patch, delete

router.post('/',[validarToken],crearLibro)
router.get('/',[validarToken], consultarLibro)
router.get('/:id',[validarToken], consultarLibroPorID)
router.put('/:id',[validarToken], actualizarLibro)

/*router.patch('/:id/enabled',habilitarLibroPorID)*/
module.exports=router