import {Router} from 'express'
import { getUser, login , register, deleteUser, getUserById, editUser} from '../controllers/userControllers'
import { verifyToken } from '../util/verifyToken'

const userRouter = Router()

userRouter.get('/user',verifyToken,getUser)
userRouter.get('/user/token',verifyToken,getUserById)
userRouter.post('/user/register',register)
userRouter.post('/user/login',login)
userRouter.delete('/user/:id',deleteUser)
userRouter.put('/user/:id',editUser)
export default userRouter