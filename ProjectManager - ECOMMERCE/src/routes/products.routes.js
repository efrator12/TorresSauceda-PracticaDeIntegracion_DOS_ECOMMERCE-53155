import { Router } from "express";
import productDao from "../dao/mongoDao/product.dao.js";

const router = Router();

const getProduct = async (req, resp) => {
  try {
    const { limit, page, sort, category, status } = req.query;
    const options = {
      limit: limit || 10,
      page: page || 1,
      sort: {
        price: sort === "asc" ? 1 : -1,
      },
      lean: true,
    };
    if (status) {
      const products = await productDao.obtenerTodo(
        { status: status },
        options
      );
      return resp.status(200).json({ products });
    }

    if (category) {
      const products = await productDao.obtenerTodo(
        { category: category },
        options
      );
      return resp.status(200).json({ products });
    }

    const products = await productDao.obtenerTodo({}, options);
    console.log(products.docs.length);

    if (products.docs.length > 0) {
      resp.status(200).json({ status: "success", products });
    } else {
      throw new Error();
    }
  } catch (error) {
    resp
      .status(400)
      .json({ status: "error", response: "Sin productos en catalago" });
  }
};

const getByID = async (req, resp) => {
  try {
    const { pid } = req.params;
    const product = await productDao.obtenerPorID(pid);
    resp.status(200).json({ status: "success", response: product });
  } catch (error) {
    resp.status(404).json({ status: "error", error: error.message });
  }
};

const addProduct = async (req, resp) => {
  try {
    const product = req.body;
    const newProduct = await productDao.crear(product);
    if (typeof newProduct === "string") throw Error(newProduct);
    resp.status(201).json({ status: "success", response: newProduct });
  } catch (error) {
    resp.status(404).json({ status: "error", error: error.message });
  }
};

const updateProducts = async (req, resp) => {
  try {
    const { pid } = req.params;
    const product = req.body;
    await productDao.obtenerPorID(pid);
    const updateProduct = await productDao.actualizarPorID(pid, product);
    resp.status(201).json({ status: "success", response: updateProduct });
  } catch (error) {
    resp.status(404).json({ status: "error", error: error.message });
  }
};

const deleteProducts = async (req, resp) => {
  try {
    const { pid } = req.params;
    const resultadoEliminado = await productDao.eliminarPorID(pid);
    resp.status(201).json({
      status: "success",
      response: `Producto Eliminado con el ID: ${pid}`,
    });
  } catch (error) {
    resp.status(404).json({ status: "error", error: error.message });
  }
};

router.get("/", getProduct);
router.get("/:pid", getByID);
router.post("/", addProduct);
router.put("/:pid", updateProducts);
router.delete("/:pid", deleteProducts);

export default router;
