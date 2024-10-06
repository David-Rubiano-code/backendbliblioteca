const {Router} = require('express')
const {
    crearLocalizacion,
    consultarLocalizacion,
    consultarLocalizacionPorID,
    actualizarLocalizacion,
    }=require('../controllers/localizacionController')
const { validarToken } = require('../middlewares/validar-token')
const router = Router()
//get, post, put,patch, delete

router.post('/',[validarToken],crearLocalizacion)
router.get('/',[validarToken], consultarLocalizacion)
router.get('/:id',[validarToken], consultarLocalizacionPorID)
router.put('/:id',[validarToken], actualizarLocalizacion)
/*router.patch('/:id/enabled',habilitarUsuarioPorID)*/
module.exports=router