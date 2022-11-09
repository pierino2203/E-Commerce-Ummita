import {Router} from 'express'
import { getUser, login , register, deleteUser, getUserById, editUser} from '../controllers/userControllers'

const userRouter = Router()

userRouter.get('/user',getUser)
userRouter.get('/user/:id',getUserById)
userRouter.post('/user/register',register)
userRouter.post('/user/login',login)
userRouter.delete('/user/:id',deleteUser)
userRouter.put('/user/:id',editUser)
export default userRouter