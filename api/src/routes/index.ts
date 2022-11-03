import {Router} from 'express'
import productRouter from '../routes/productRoutes'
import categoryRouter from '../routes/categoryRoutes'
import proveedorRouter from './proveedorRoutes'
import userRouter from './userRoutes'

const router = Router()
router.use('/',productRouter)
router.use('/',categoryRouter)
router.use('/',proveedorRouter)
router.use('/',userRouter)
export default router;