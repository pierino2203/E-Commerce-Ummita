import {Router} from 'express'
import { deleteProduct, getProduct, GetProductById, postProduct, updateProduct } from '../controllers/productsController';

const productRouter= Router()
productRouter.get('/product',getProduct);
productRouter.get('/product/:id',GetProductById)
productRouter.post('/product',postProduct)
productRouter.delete('/product/:id',deleteProduct)
productRouter.put('/product/:id',updateProduct)
export default productRouter;