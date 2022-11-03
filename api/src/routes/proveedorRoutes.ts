import {Router} from 'express'
import { addProveedores, deleteProveedor, getProveedores } from '../controllers/proveedoresController'

const proveedorRouter= Router()

proveedorRouter.get('/proveedor',getProveedores)
proveedorRouter.post('/proveedor',addProveedores)
proveedorRouter.delete('/proveedor/:id',deleteProveedor)
export default proveedorRouter