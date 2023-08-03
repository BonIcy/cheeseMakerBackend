const { Router } = require('express');
const { check } = require('express-validator');

const { validateDocuments} = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');

const { getCategoria,getCategorias, postCategoria, deleteCategoria, updCategoria} = require('../controllers/categoria.controllers.js');
const { isAdminRole } = require('../middlewares/validate.role.js');
const { categoriaExistsById, isValidRole } = require('../helpers/db.validators.js');


const router = Router();

/**
 * localhost/api/categorias
 */



router.get('/:id', getCategoria);
router.get('/', getCategorias);
// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
   validateJWT, 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validateDocuments
], postCategoria );
router.delete('/:id',[
      validateJWT,
      isAdminRole,
      check('id', 'Mo es id valido').isMongoId(),
      check('id').custom(categoriaExistsById,), 
      validateDocuments
], deleteCategoria)
router.put('/:id', [
      check('id', 'No es un ObjectID MongoDB válido').isMongoId(),
      check('id').custom( categoriaExistsById ),
      validateDocuments
  ], updCategoria );


module.exports = router;