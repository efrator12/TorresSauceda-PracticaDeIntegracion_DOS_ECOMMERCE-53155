import fs from "fs";

let carts = [];
const pathfile = "./src/data/carts.json";

const getCarts = async () => {
  const cartsJSON = await fs.promises.readFile(pathfile, "utf-8");
  carts = JSON.parse(cartsJSON) || [];
  return carts;
};

const createCarts = async () => {
  try {
    await getCarts();
  } catch (error) {
    carts = [];
  }
  const newCart = {
    id: carts.length + 1,
    products: [],
  };

  carts.push(newCart);
  await fs.promises.writeFile(pathfile, JSON.stringify(carts));

  return newCart;
};

const getCartsByID = async (cid) => {
  try {
    await getCarts();
  } catch (error) {
    return "No existe ningun CART";
  }

  const cartExist = carts.find((c) => c.id === cid);
  if (!cartExist) {
    return `No existe el carrito con el ID: ${cid}`;
  } else if (cartExist.products.length === 0) {
    return `El carrito con el ID: ${cid} no tiene PRODUCTOS`;
  } else {
    return cartExist.products;
  }
};

const addProducts_To_Carts = async (cid, pid) => {
  try {
    await getCarts();
  } catch (error) {
    return "No existe ningun CART";
  }

  const indexCt = carts.find((c) => c.id === cid);
  if (indexCt === undefined) return `No existe el carrito con el ID: ${cid}`;

  const indexPd = indexCt.products.find((p) => p.product === pid);
  if (indexPd !== undefined) {
    carts[indexCt] = ++indexPd.quantity;
  } else {
    carts[indexCt] = indexCt.products.push({ product: pid, quantity: 1 });
  }
  await fs.promises.writeFile(pathfile, JSON.stringify(carts));
  return indexCt;
};

export default {
  createCarts,
  getCarts,
  getCartsByID,
  addProducts_To_Carts,
};
