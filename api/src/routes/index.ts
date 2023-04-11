import {Router} from 'express'
import productRouter from '../routes/productRoutes'
import categoryRouter from '../routes/categoryRoutes'
import proveedorRouter from './proveedorRoutes'
import userRouter from './userRoutes'
import mercadoRouter from './mercadoPagoRoutes'
import orderRouter from './orderRoutes'

const router = Router()
router.use('/',productRouter)
router.use('/',categoryRouter)
router.use('/',proveedorRouter)
router.use('/',userRouter)
router.use('/',mercadoRouter)
router.use('/',orderRouter)
export default router;