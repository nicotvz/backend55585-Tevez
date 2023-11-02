import express from "express";

import productsRouter from "./routes/products-router.js";
import cartsRouter from "./routes/cart-router.js";
import productsViews from "./routes/views-router.js";

import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", productsViews);

const httpServer = app.listen(8080, () =>
  console.log("Servidor activo en el puerto 8080")
);
const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("Nuevo usuario conectado");
});

export { io };
