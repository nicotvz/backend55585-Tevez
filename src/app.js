import express from "express";
import morgan from "morgan";

import cowsay from "cowsay";
import colors from "colors";

import handlebars from "express-handlebars";
import { multiply, compare } from "./views/helpers.js";

import cookieParser from "cookie-parser";
import initializePassport from "./auth/passport.js";

import __dirname from "./utils.js";
import socket from "./socket.js";

import routerAPI from "./routes/routes.js";
import errorHandler from "./middlewares/errors/index.js";

const env = async () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(`${__dirname}/public`));
  app.use(morgan("dev"));
  app.use(cookieParser());
  initializePassport();

  routerAPI(app);

  app.use(errorHandler);

  app.engine(
    "handlebars",
    handlebars.engine({
      helpers: {
        multiply: multiply,
        compare: compare,
      },
      defaultLayout: "main",
    })
  );
  app.set("view engine", "handlebars");
  app.set("views", __dirname + "/views");

  const httpServer = app.listen(8080, () =>
    console.log(
      cowsay.say({
        text: "Server up in port 8080!",
      }).rainbow
    )
  );

  socket.connect(httpServer);
};

env();
