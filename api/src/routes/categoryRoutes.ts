import {Router} from 'express'  
import { addCategory, deleteCategory, getCategory } from '../controllers/categoryControllers';

const categoryRouter = Router();
categoryRouter.get('/category',getCategory)
categoryRouter.post('/category',addCategory)
categoryRouter.delete('/category/:id',deleteCategory)
export default categoryRouter