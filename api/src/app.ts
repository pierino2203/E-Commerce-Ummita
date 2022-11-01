import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import router from './routes';
import cors from 'cors'
dotenv.config()

const app = express();

//setting
app.set('port', process.env.PORT || 4000)

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())

//routes
app.use('/',router)
export default app;