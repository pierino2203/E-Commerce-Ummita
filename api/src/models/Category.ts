import { Schema, model} from 'mongoose'
import {category} from '../controllers/interfaces/interfaces'

const categorySchema = new Schema({
  name:{
    type: String,
    require: true
  }
},{
  timestamps: false,
  versionKey: false
})

export default model<category>('category',categorySchema)