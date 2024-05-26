import express, { response } from "express";
import router from "./routes/index.js";
import { connectMongoDB } from "./config/mongoDB.config.js";

// Para crear una aplicacion:
const app = express();
connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);

// Para inicializar la APP de EXPRESS se necesita configurar puerto:
const port = 8080;
const ready = console.log("Server Ready on Port " + port);

// Para inicializar el servidor:
app.listen(port, ready);
