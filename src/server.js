import fs from 'fs'
import express from 'express'
import router from './routes/index.js'


const server = express()


server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use('/',router)


// app.get('/products', (req, res) => {
//     let limit = req.query.limit
//     let productos = instancia.getProducts()
//     if (req.query.limit != undefined) {
//         let limiteProductos = productos.slice(0,req.query.limit)
//         res.send(limiteProductos)
//     } else {
//         res.send(productos)
//     }
// })

// app.get('/products/:pid', (req, res) => {
//     let idProducto = req.params.pid
//     let productos = instancia.getProducts()
//     let productoFiltrado = productos.find(u=> u.id == idProducto)
//     if (productoFiltrado) {
//         res.send(productoFiltrado)
//     } else {
//         res.send("El objeto no existe")
//     }
// })


server.listen(8080, () => console.log("Servidor escuchando 8080"))


