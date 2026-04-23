import express from 'express'
import {createProduct, getProducts, deleteProduct, updateProduct, getProductById} from '../controllers/productController.js'

const productRouter = express.Router()

productRouter.post('/', createProduct)
productRouter.get('/', getProducts)
productRouter.delete('/:productId', deleteProduct)
productRouter.get('/:productId', getProductById)
productRouter.put('/:productId', updateProduct)

export default productRouter