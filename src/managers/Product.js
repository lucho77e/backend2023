import fs from 'fs'

class Product {
    constructor (path){
        this.productos = []
        this.resultado
        this.ruta = path 
        this.existeFile = false

        // Confirmo si ya existe el archivo JSON
        if (fs.existsSync(this.ruta)){
            this.existeFile = true
        }

        if (this.existeFile) {
            this.resultado = JSON.parse(fs.readFileSync(this.ruta, 'UTF-8')) 
            this.productos = this.resultado 
        } else {
            this.productos = []
        }

    }

    getProducts() {
        if (this.existeFile) {
            this.resultado =  JSON.parse(fs.readFileSync(this.ruta, 'UTF-8'))
            this.productos = this.resultado
        }
        console.log("El listado de productos es:")
        console.log(this.productos)
        return this.productos
    }
    

    async addProduct( title, description, price, thumbnail, code, stock ) {
        try{
            if (stock != undefined) {

                let filtrado = this.productos.filter(function(el) {
                    return el.code === code;
                })

                if (filtrado.length == 0) {
                    let next_id
                    if (this.productos.length > 0) {
                        next_id = this.productos[this.productos.length-1].id+1
                    } else {
                        next_id = 1
                    }

                    let productoParaAgregar ={
                        id: next_id,
                        title: title,
                        description: description,
                        price: price,
                        thumbnail: thumbnail,
                        code: code,
                        stock: stock
                    }
                    this.productos.push(productoParaAgregar)
                    let data_json = JSON.stringify(this.productos,null,2)
                    await fs.promises.writeFile(this.ruta, data_json)
                    this.existeFile = true
                    
                    return 'User ID: '+productoParaAgregar.id

                } else {
                console.log("Error: Ya existe un producto con el mismo Código")
                }

            } else {
                console.log("Error: Faltan especificar algunos campos. Debe ingresar los parámetros Título, Descripción, Precio, Imagen, Código y Stock")
            }
        } catch(error) {
            console.log(error)
            return 'Error al crear el usuario'
        }
    }

    getProductsById(id) {
        let filtrado = this.productos.filter(function(el) {
            return el.id === id;
        })
        if (filtrado.length > 0) {
            console.log(filtrado)
            return filtrado
        } else {
            console.log("Not found")
        }
    }


    async updateProduct(id, data) {
        try {
            let indice = this.productos.findIndex(producto => producto.id === id)
            let productoParaModificar = this.productos[indice]
    
            for (let prop in data) {     
                productoParaModificar[prop] = data[prop]
            }
    
            this.productos[indice] = productoParaModificar
            let data_json = JSON.stringify(this.productos,null,2)
            await fs.promises.writeFile(this.ruta, data_json)
            return 'Updated user: '+ id
        } catch(error) {
            console.log(error)
            return 'Error al modificar el usuario'
        }


    }


    async deleteProduct(id) {
        try{
            this.productos = this.productos.filter(el => el.id!==id)
            let data_json = JSON.stringify(this.productos,null,2)
            await fs.promises.writeFile(this.ruta, data_json)
            return 'Deleted user: '+ id
        } catch(error) {
            console.log(error)
            return 'Error al borrar el usuario'
        }

    }
}

let manager = new Product('./data/products.json');


export default manager

