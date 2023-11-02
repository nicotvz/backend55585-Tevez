import { Router } from "express";
import CartManager from "../cartManager.js";

const router = Router();

const carts = new CartManager("./carrito.json");

router.post("/", (req, res) => {
  try {
    const cartList = carts.createCart();

    res.send({ status: "Cart created" });
  } catch (error) {
    return error;
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const idCart = parseInt(req.params.cid);
    const cartFound = await carts.getCartById(idCart);

    if (!cartFound)
      return res.status(400).send({ status: "Error cart not founded" });

    return res.send({ status: cartFound });
  } catch (error) {}
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    const product = await carts.addProductCart(cid, pid);

    res.send({ result: product });
  } catch (err) {
    res.status(500).send("Error al agregar producto al carrito" + err);
  }
});

export default router;
