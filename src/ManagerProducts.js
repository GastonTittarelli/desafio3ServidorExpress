import fs from "fs";

class ProductManager {
    constructor () {
        this.path = "products.json";
    }
    
    getNextId = () => {
        let contenido = fs.readFileSync(this.path, "utf-8");
        let productos = JSON.parse(contenido);
        return productos.length + 1;
    }

    async addProduct (product) {
        product.id = await this.getNextId();
        let contenido = await fs.promises.readFile(this.path)
        let productos = JSON.parse(contenido)
        productos.push(product)
        await fs.promises.writeFile(this.path, JSON.stringify(productos))
    }

    async getProducts () {
        let productos;
        try {
            let contenido = await fs.promises.readFile(this.path)
            productos = JSON.parse(contenido)
        }catch(error){
            console.log(error)
        }
        return productos;
}

async getProductById (id) {
    let producto = "No se encontro el producto"
    let contenido = await fs.promises.readFile(this.path)
    let productos = JSON.parse(contenido)
    let productoId = productos.find(producto => producto.id == id)
    if (productoId) {
        producto = productoId
    }
    return producto;
}

async updateProduct (id, product) {
    let productos = await this.getProducts()
    let indice = productos.findIndex(producto => producto.id == id)
    if (indice !== -1){
        productos[indice] = product 
    }
    await fs.promises.writeFile(this.path, JSON.stringify(productos))
    return `Producto con el id ${productos[indice].id } actualizado`
}

async deleteProduct (id) {
    let productos = await this.getProducts()
    let indice = productos.findIndex(producto => producto.id == id)
    let objetoEliminado;
    if (indice !== -1){
        objetoEliminado = productos.splice(indice, 1)[0]
        await fs.promises.writeFile(this.path, JSON.stringify(productos))
        return `Producto con el id ${objetoEliminado.id} eliminado`
    }
    return `Producto con el id ${id} no encontrado`
}
}


const manager = new ProductManager();
let product1 = {
    title: "Coca Cola",
    description: "Gaseosa de cola",
    price: 100,
    thumbnail: "imagen231",
    code: "1234",
    stock: 10
}

let product2 = {
    title: "Sprite",
    description: "Gaseosa de limon",
    price: 100,
    thumbnail: "imagen3331",
    code: "1234",
    stock: 10
}

export default ProductManager;
// Añadir productos
// manager.addProduct(product1)
// let totalProducts = await manager.getProducts()


// Visualizar todos los productos
// console.log(totalProducts)


// Visualizar los productos por id
// let produc = await manager.getProductById(2)
// console.log(produc)


// Actualizar producto por id
// let respuesta = await manager.updateProduct(3, product2)
// console.log(respuesta)


// Eliminar producto por id
// let respuesta = await manager.deleteProduct(3)
// console.log(respuesta)