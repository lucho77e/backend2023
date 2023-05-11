import { Router } from "express"
import manager from "../../managers/Cart.js"

const router = Router()

router.post('/', async(req, res, next) => {
    try {
        let response = await manager.add_cart(req.body)
        if (response===201) {
            return res.json({ status:201,message:'cart created'})
        }
        return res.json({ status:400,message:'not created'})
    } catch(error) {
        next(error)
    }

})

// app.post('/api/carts/:cid/:pid', (req, res) => {
//     let idCarrito = req.params.cid
//     let idProducto = req.params.pid
//     let index = productos.findIndex(x => x.id == idProducto);

//     if(carritos[idCarrito] && index != -1) {
        
//         let indexProducto = carritos[idCarrito].products.findIndex(x => x.id == idProducto)

//         if (indexProducto == -1) {
//             carritos[idCarrito].products.push({
//                 id: idProducto,
//                 quantity: 1
//             })
//         } else {
//             carritos[idCarrito].products[indexProducto].quantity = carritos[idCarrito].products[indexProducto].quantity + 1
//         }

//         res.json(carritos)
//         fs.writeFileSync('../carritos.json', JSON.stringify(carritos))
    
//     } else {
//         res.send("El carrito o el producto no existen")
//     }

// })


// app.get('/api/carts/:cid', (req, res) => {
//     let idCarrito = req.params.cid
//     let carritoFiltrado = carritos[idCarrito]
//     if (carritoFiltrado) {
//         res.send(carritoFiltrado.products)
//     } else {
//         res.send("El objeto no existe")
//     }
// })

// router.get('/', async(req, res, next) => {
//     try {
//         let limit = req.query.limit
//         let productos = manager.getProducts()
//         if (req.query.limit != undefined) {
//             let limiteProductos = productos.slice(0,req.query.limit)
//             return res.json({
//                 status: 200,
//                 productos: limiteProductos
//             })
//         } else {
//             return res.json({
//                 status: 200,
//                 productos 
//             } )
//         }
//         // let message = 'not found'
//         // return res.json({ status:404,message })
//     } catch (error) {
//         next(error)
//     }
// })


export default router