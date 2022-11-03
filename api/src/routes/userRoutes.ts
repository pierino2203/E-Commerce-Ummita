import {Router} from 'express'
import { getUser } from '../controllers/userControllers'

const userRouter = Router()

userRouter.get('/user',getUser)
export default userRouter