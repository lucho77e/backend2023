import { Router } from "express"
import manager from "../../managers/Product.js"

const router = Router()

router.get('/', async(req, res, next) => {
    try {
        let limit = req.query.limit
        let productos = manager.getProducts()
        if (req.query.limit != undefined) {
            let limiteProductos = productos.slice(0,req.query.limit)
            res.json({
                status: 200,
                productos: limiteProductos
            })
        } else {
            res.json({
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


router.get('/', async(req,res,next)=> {
    try {
        let products = manager.read_products()
        if (products.length>0) {
            return res.json({ status:200,products })
        }
        let message = 'not found'
        return res.json({ status:404,message })
    } catch(error) {
        next(error)
    }
})


router.get('/products/:pid', (req, res) => {
    let idProducto = req.params.pid
    let productos = manager.getProducts()
    let productoFiltrado = productos.find(u=> u.id == idProducto)
    if (productoFiltrado) {
        res.send(productoFiltrado)
    } else {
        res.send("El objeto no existe")
    }
})

export default router