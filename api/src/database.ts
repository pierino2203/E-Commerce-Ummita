import mongoose from 'mongoose'

import dotenv from 'dotenv'
import Product from './models/Product'
import productos from './jsonData/products'
dotenv.config()
const URI = process.env.URI || "error"
console.log(URI)
void (async () => {
    try {
        const db = await mongoose.connect(URI)
        console.log("DB is connect to:", db.connection.name) 
        const find = await Product.find()
        if(find.length !== 0){
            console.log('Los Productos ya estan cargados en la base de datos')
        }else{
            Product.insertMany(productos)
            .then(val => {console.log('Productos en base de datos')})
            .catch(err => {console.log(err)})
        }
    } catch (error) {
       console.log("Error in connect DB",error)
    }
})()