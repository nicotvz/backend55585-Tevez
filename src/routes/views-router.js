import { Router } from "express";
import ProductManager from "../productManager.js";

const router = Router();

const productList = new ProductManager("./products.json");
const products = await productList.getProducts();

router.get("/", async (req, res) => {
  res.render("home", {
    products: products,
    style: "index.css",
  });
});

router.get("/realTimeProducts", async (req, res) => {
  res.render("realTimeProducts", {
    products: products,
    style: "index.css",
  });
});

export default router;
