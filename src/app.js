import express from "express";
import ProductManager from "./ManagerProducts.js";

const app = express();
const manager = new ProductManager();

app.get("/", (req, res) => {
res.send("Welcome to summoner's rift")
})

app.get("/products", async (req, res) => {
    let productos = await manager.getProducts()
    const limit = req.query.limit;
    if (limit){
        res.send(productos.slice(0, limit));
    }else{
        res.send(productos);
    }
})

app.get("/products/:pid" , async (req, res) => {
    let productoId = await manager.getProductById(req.params.pid)
    res.send(productoId)
})
const server = app.listen(8080, () => console.log("servidor corriendo: 8080"))