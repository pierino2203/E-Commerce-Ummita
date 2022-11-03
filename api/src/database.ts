import mongoose from 'mongoose'

import dotenv from 'dotenv'
import Product from './models/Product'
import productos from './jsonData/products'
import Category from './models/Category'
import categorias from './jsonData/categories'
import Proveedor from './models/Proveedor'
import proveedores from './jsonData/proveedors'
dotenv.config()
const URI = process.env.URI || "error"
console.log(URI)
void (async () => {
    try {
        const db = await mongoose.connect(URI)
        console.log("DB is connect to:", db.connection.name) 
        const find = await Product.find()
        const cat = await Category.find()
        const pro = await Proveedor.find()
        if(find.length !== 0 && cat.length !==0 && pro.length !==0 ){
            console.log('Los Productos ya estan cargados en la base de datos')
        }else{
            Product.insertMany(productos)
            Category.insertMany(categorias)
            Proveedor.insertMany(proveedores)
            .then(val => {console.log('Productos en base de datos')})
            .catch(err => {console.log(err)})
        }
    } catch (error) {
       console.log("Error in connect DB",error)
    }
})()