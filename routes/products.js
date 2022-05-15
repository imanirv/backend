const express = require('express');
const router = express.Router();
const controller = require('../controllers')

router.get('/', controller.product.getProducts)
router.post('/', controller.product.createProduct)

router.route("/:id")
    .get(controller.product.getProductById)
    .put(controller.product.updateProductById)
    .delete(controller.product.deleteProductById)



module.exports = router