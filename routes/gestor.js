const {Router} = require('express')
const {crearGestor, loguear
}=require('../controllers/gestorController')
const { validarGestor } = require('../middlewares/validar-gestor')
const router = Router()
//get, post, put,patch, delete

router.post('/',[validarGestor],crearGestor)
router.post('/login',loguear)
module.exports=router 