import {Schema,model} from 'mongoose'

const orderSchema = new Schema({
  user_id:{
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  date:{
    type: Date,
    default: Date.now
  },
  total:{
    type: Number,
    require: true
  },
  payment:{
    type: Boolean,
    default: false
  },
  productos:[{
    type: Schema.Types.ObjectId,
    ref: 'products'
  }] 
},{
  timestamps: false,
  versionKey: false
})
export default model('order',orderSchema)