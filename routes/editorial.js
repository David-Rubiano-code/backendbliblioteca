const {Router} = require('express')
const {
    crearEditorial,
    consultarEditorial,
    consultarEditorialPorID,
    actualizarEditorial,
  
}=require('../controllers/editorialController')
const { validarToken } = require('../middlewares/validar-token')
const router = Router()
//get, post, put,patch, delete

router.post('/',[validarToken],crearEditorial)
router.get('/',[validarToken], consultarEditorial)
router.get('/:id',[validarToken], consultarEditorialPorID)
router.put('/:id',[validarToken], actualizarEditorial)
/*router.patch('/:id/enabled',habilitarUsuarioPorID)*/
module.exports=router