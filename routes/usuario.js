const {Router} = require('express')
const {crearUsuario,
    consultarUsuario,
    consultarUsuarioPorID,
    actualizarUsuario,
    deshabilitarUsuarioPorID,
    /*habilitarUsuarioPorID*/}=require('../controllers/usuarioController')
const { validarToken } = require('../middlewares/validar-token')
const router = Router()
//get, post, put,patch, delete

router.post('/',[validarToken],crearUsuario)
router.get('/',[validarToken], consultarUsuario)
router.get('/:id',[validarToken], consultarUsuarioPorID)
router.put('/:id',[validarToken], actualizarUsuario)
router.patch('/:id',[validarToken],deshabilitarUsuarioPorID)
/*router.patch('/:id/enabled',habilitarUsuarioPorID)*/
module.exports=router