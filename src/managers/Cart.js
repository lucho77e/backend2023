import fs from 'fs'

class Cart {

    constructor (path){
        this.carritos = []
        this.ruta = path 
        this.existeFile = false

    }


    async add_cart() {
        try { 
            console.log("Estoy entrando aca 1")

            let nuevoCarrito = {
                id: this.carritos.length,
                products: []
            }
            this.carritos.push(nuevoCarrito)
            
        
            console.log(`Nuevo carrito creado, id: ${nuevoCarrito.id}`)
            fs.writeFileSync(this.ruta, JSON.stringify(this.carritos))
            
        } catch (error) {
            console.log(error)
            return null
        }
    }

}





let manager = new Cart('./data/carts.json');

export default manager