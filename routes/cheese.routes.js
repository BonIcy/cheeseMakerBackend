let { Router } = require("express");
let { check } = require("express-validator");
let { validateDocuments } = require("../middlewares/validate.documents");
let { validateJWT } = require("../middlewares/validate.jwt");
let { isAdminRole } = require("../middlewares/validate.role");
let {cheeseExistsById} = require("../helpers/db.validators.js")


let {getCheesees, getCheese, postCheese, deleteCheese, putCheese  } = require("../controllers/cheese.controller.js");

let router = Router();

router.get('/', getCheesees);
router.get('/:id', getCheese);
router.post('/', [
    validateJWT,
    check('id', 'ObjectID no valido').isMongoId(),
    check('id').custom(validateDocuments),
    validateDocuments,
], postCheese);
router.delete('/:id', [
    validateJWT,
    check('id', 'ObjectID no es valido').isMongoId(),
    check('id').custom(cheeseExistsById),
    validateDocuments
], deleteCheese)
router.put('/:id', [
    validateJWT,
    check('id', 'ObjectID no valido').isMongoId(),
    check('id').custom(cheeseExistsById),
    validateDocuments
], putCheese);

module.exports = router;