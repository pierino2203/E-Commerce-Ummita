import {Schema, model} from 'mongoose'
import {product} from '../controllers/interfaces/interfaces'

const productSchema = new Schema({
  name:{
    type: String,
    require: true
  },
  tipo:{
    type: String,
  },
  precio_compra:{
    type: Number,
    require: true
  },
  precio_venta:{
    type: Number,
    require: true
  },
  precio_D:{
    type: Number,
    require: true
  },
  precio_C:{
    type: Number,
    require: true
  },
  description:{
    type: String,
  },
  img:{
    type: String
  },
  stock:{
    type: Number,
    require: true
  },
  on:{
    type: Boolean,
    default: true
  },
  category:{
    type: String
  }

},{
  timestamps : false,
  versionKey : false
})

export default model<product>('product',productSchema)