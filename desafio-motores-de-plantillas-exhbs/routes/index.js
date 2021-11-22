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
                res.render("index", null);
            })
            .catch((err) => console.log("Error router.post('/')", err));
    });

    // //* recibe y actualiza un producto según su id
    // router.put('/:id', (req, res) => {
    //     const {id} = req.params;
    //     const obj = req.body;
    //     const updatedObj = ddbb.updateById(id, obj);
    //     updatedObj.then(response => {
    //         if (response) {
    //             res.json(response);
    //             console.log("Productos Actualizado",response);
    //         } else {
    //             res.json(objErr);
    //         }
    //     }).catch(err => console.log("Error router.put('/:id')", err));
    // })

    // //* Elimina el producto según su id
    // router.delete('/:id', (req, res) => {
    //     const {id} = req.params;
    //     const productDeleted = ddbb.deleteById(id);
    //     productDeleted.then(response => {
    //         if (response) {
    //             res.json(response);
    //         } else {
    //             res.json(objErr);
    //         }
    //     }).catch(err => console.log("Error router.delete('/:id')", err));

    // })
}

module.exports = serverRoutes;