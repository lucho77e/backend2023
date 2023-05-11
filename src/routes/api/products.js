import { Router } from "express"
import manager from "../../managers/Product.js"

const router = Router()

router.get('/', async(req, res, next) => {
    try {
        let limit = req.query.limit
        let productos = manager.getProducts()
        if (req.query.limit != undefined) {
            let limiteProductos = productos.slice(0,req.query.limit)
            return res.json({
                status: 200,
                productos: limiteProductos
            })
        } else {
            return res.json({
                status: 200,
                productos 
            } )
        }
        // let message = 'not found'
        // return res.json({ status:404,message })
    } catch (error) {
        next(error)
    }
})


router.get('/:pid', (req, res, next) => {
    try {
        let idProducto = req.params.pid
        let productos = manager.getProducts()
        let productoFiltrado = productos.find(u=> u.id == idProducto)
        if (productoFiltrado) {
            return res.json({
                status: 200,
                productos: productoFiltrado
            })
        // } else {
        //     res.send("El objeto no existe")
        }
        
    } catch (error) {
        next(error)
    }
})

export default router