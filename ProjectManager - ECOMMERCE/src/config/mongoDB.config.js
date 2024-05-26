import mongoose from "mongoose";

const urlDB =
  "mongodb+srv://efrator12:eGvGNEs6x4V7@e-commerce.xo6330o.mongodb.net/ecommerce";

export const connectMongoDB = async () => {
  try {
    mongoose.connect(urlDB);
    console.log("Mongo DB conectado");
  } catch (error) {
    console.log(error);
  }
};
