import { Router } from "express";
import cartDao from "../dao/mongoDao/cart.dao.js";

const router = Router();

const obtainCARTS = async (req, resp) => {
  try {
    const carts = await cartDao.obtenerTodo();
    if (carts.length > 0) {
      resp.status(200).json({ status: "success", payload: carts });
    } else {
      throw new Error();
    }
  } catch (error) {
    resp.status(404).json({
      status: "error",
      response: `No existe ningun CART or ${error.message}`,
    });
  }
};

const obtainCARTByID = async (req, resp) => {
  try {
    const { cid } = req.params;
    const cart_products = await cartDao.obtenerPorID(cid).catch((error) => {
      throw new Error(`No se encontro CART con el ID: ${cid}`);
    });
    resp.status(200).json({ status: "success", payload: cart_products });
  } catch (error) {
    resp.status(404).json({
      status: "error",
      response: error.message,
    });
  }
};

const createCART = async (req, resp) => {
  try {
    const newCart = await cartDao.crear();
    resp.status(201).json({ status: "success", payload: newCart });
  } catch (error) {
    resp
      .status(404)
      .json({ status: "error", response: "No se puede crear el CART" });
  }
};

const add_Products_To_Carts = async (req, resp) => {
  try {
    const { cid, pid } = req.params;
    const newProductInCart = await cartDao.agregarProducto(cid, pid);
    resp.status(201).json({ status: "success", payload: newProductInCart });
  } catch (error) {
    resp.status(404).json({ status: "error", response: error.message });
  }
};

const delete_Products_In_Carts = async (req, resp) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartDao.eliminarProductoEnCarro(cid, pid);

    if (cart === false) {
      throw Error();
    } else {
      resp.status(201).json({
        status: "success",
        payload: `Producto con el ID: ${pid} eliminado`,
      });
    }
  } catch (error) {
    resp
      .status(404)
      .json({ status: "error", response: "No se elimino ningun producto" });
  }
};

router.post("/", createCART);
router.get("/", obtainCARTS);
router.get("/:cid", obtainCARTByID);
router.post("/:cid/products/:pid", add_Products_To_Carts);
router.delete("/:cid/products/:pid", delete_Products_In_Carts);

export default router;
