const { Router } = require("express");
const contenedor = require("../contenedor");
const router = Router();

const ddbb = new contenedor("productos.txt");
const objErr = { error: "Producto no encontrado" };

function serverRoutes(app) {
    app.use("/api/productos", router);

    //* devuelve todos los productos
    router.get("/", (req, res) => {
        const allProducts = ddbb.getAll();
        allProducts
            .then((response) => {

                res.render("index", {
                    products: response 
                });
            })
            .catch((err) => console.log("Error router.get('/')", err));
    });

    //* devuelve un producto según su ID
    router.get("/:id", (req, res) => {
        console.log(req.params)
        const { id } = req.params;
        const object = ddbb.getById(id);
        object
            .then((response) => {
                if (response) {

                    res.render("index", { products: [response] });
                } else {
                    res.json(objErr);
                }
            })
            .catch((err) => console.log("Error router.get('/:id')", err));
    });

    //* recibe y agrega un producto, lo devuelve con su id
    router.post("/", (req, res) => {
        console.log(req.body)
        const object = req.body;
        const savedObject = ddbb.save(object);
        savedObject
            .then((response) => {
                res.render("index", { products: [] });
            })
            .catch((err) => console.log("Error router.post('/')", err));
    });
}

module.exports = serverRoutes;