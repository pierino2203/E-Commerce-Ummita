import {Schema, model} from 'mongoose'
import {user} from '../controllers/interfaces/interfaces'

const userSchema= new Schema({
  name:{
    type: String,
    require: true
  },
  lastName:{
    type: String,
    require: true
  },
  mail: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  img:{
    type: String,
    
  },
  adress:{
    type: String,
    require: true
  },
  admin:{
    type: Boolean,
    default: false
  }
},{
  timestamps: false,
  versionKey: false
})

export default model<user>('user',userSchema)