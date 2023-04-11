import {Router} from 'express'
import { getOrder, postOrder } from '../controllers/ordersControllers'

const orderRouter = Router()

orderRouter.get('/order',getOrder)
orderRouter.post('/order',postOrder)
export default orderRouter