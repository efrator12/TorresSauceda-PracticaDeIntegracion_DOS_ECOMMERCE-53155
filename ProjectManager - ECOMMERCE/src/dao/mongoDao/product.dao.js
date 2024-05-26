import { productModel } from "../models/product.model.js";

const obtenerTodo = async (query, options) => {
  const products = await productModel.paginate(query, options);
  return products;
};

const obtenerPorID = async (id) => {
  try {
    const product = await productModel.findById(id);
    console.log(product);
    if (product === null) {
      throw error;
    }
    return product;
  } catch (error) {
    throw new Error(
      `El Producto con el ID: ${id} no fue encontrado o ya fue eliminado`
    );
  }
};

const crear = async (data) => {
  const newProduct = await productModel.create(data);
  return newProduct;
};

const actualizarPorID = async (id, data) => {
  await productModel.findByIdAndUpdate(id, data);
  const product = await productModel.findById(id);
  return product;
};

const eliminarPorID = async (id) => {
  let productElimanated;
  if (await obtenerPorID(id)) {
    await productModel.deleteOne({ _id: id });
    productElimanated = true;
    return productElimanated;
  }
};

export default {
  obtenerTodo,
  obtenerPorID,
  crear,
  actualizarPorID,
  eliminarPorID,
};
