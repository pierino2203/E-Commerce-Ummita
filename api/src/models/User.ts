import {Schema, model} from 'mongoose'
import {user} from '../controllers/interfaces/interfaces'
import bcrypt from 'bcryptjs'

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
    
  },
  admin:{
    type: Boolean,
    default: false
  },
  orders:[{
    type: Schema.Types.ObjectId,
    ref: 'order'
  }]
},{
  timestamps: false,
  versionKey: false
})

userSchema.methods.encryptPassword = async (password : string)  =>  {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password,salt)
}
userSchema.methods.validatePassword = function (password: string)   {
  return bcrypt.compare(password, this.password)
}
export default model('user',userSchema)