import {Schema,model} from 'mongoose'
import {proveedor} from '../controllers/interfaces/interfaces'

const proveedorSchema = new Schema({
  name:{
    type: String,
    require: true
  }
},{
  timestamps: false,
  versionKey: false
})

export default model<proveedor>('proveedor', proveedorSchema)