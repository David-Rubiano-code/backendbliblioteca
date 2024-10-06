const {Router} = require('express')
const {
    prestarEjemplar,
    devolverEjemplar,
    consultaPrestamos,
    cobrarMulta,
    consultaPrestamoPorUsuario,
    consultaPrestamosPorUsuarioYEstado
} = require('../controllers/prestamoController')
const { validarToken } = require('../middlewares/validar-token')

const router = Router()

router.post('/', [validarToken], prestarEjemplar)
router.get('/', [validarToken], consultaPrestamos)
router.put('/:id', [validarToken], devolverEjemplar)
router.put('/cobrar/:id', [validarToken], cobrarMulta)
router.get('/usuarios/:id',[validarToken], consultaPrestamoPorUsuario)
router.get('/usuarios/:estado/:id', [validarToken], consultaPrestamosPorUsuarioYEstado)

module.exports = router