const {Router} = require('express')
const {crearEjemplar,
    consultarEjemplar,
    consultarEjemplarPorID,
    actualizarEjemplar,
  }=require('../controllers/ejemplarController')
const { validarToken } = require('../middlewares/validar-token')
const router = Router()
//get, post, put,patch, delete

router.post('/',[validarToken],crearEjemplar)
router.get('/',[validarToken], consultarEjemplar)
router.get('/:id',[validarToken], consultarEjemplarPorID)
router.put('/:id',[validarToken], actualizarEjemplar)

/*router.patch('/:id/enabled',habilitarEjemplarPorID)*/
module.exports=router