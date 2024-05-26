//Se declara modulo de FYLESYSTEM:
import { log } from "console";
import fs from "fs";

// Se declara la clase PRODUCT MANAGER:
class ProductManager {
  // Se declara el constructor:
  constructor() {
    // Se declara arreglo vacio de PRODUCTOS:
    this.products = [];
    this.pathfile = "./src/data/products.json";
  }

  // Se declara funcion para añadir productos:
  addProducts = async (pdct) => {
    const { title, description, price, thumbnail, code, stock, category } =
      pdct;
    await this.getProducts();

    // TRY/CATCH para validar que el archivo JSON no este vacio:
    try {
      // Se declara el nuevo OBJETO con sus atributos:
      const newProduct = {
        id: this.products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        status: true,
      };
      // console.log(Object.entries(newProduct));

      let erroresDeLogica;
      let sinValor = [];

      const productExist = this.products.find((p) => p.code === code); // Operacion para encontrar un codigo repetido:

      //Operacion para encontrar cualquier valor de la lista de productos que tenga un valor UNDEFINED:
      const productUndefined = Object.values(newProduct).some(
        (value) => value === undefined
      );

      //Se filtra si hay valor CODE repetido:
      if (productUndefined) {
        Object.entries(newProduct).forEach(([k, v]) => {
          if (v === undefined) sinValor.push(k);
        });
        erroresDeLogica = `Te falta esto: ${sinValor}`;
        throw new Error(erroresDeLogica);
      } else {
        if (productExist) {
          erroresDeLogica = `Ya existe el Producto con el CODIGO: ${code}`;
          throw new Error(erroresDeLogica);
        } else {
          this.products.push(newProduct);
          await fs.promises.writeFile(
            this.pathfile,
            JSON.stringify(this.products)
          ); // Se agrega Nuevo Producto al ARREGLO.
          return newProduct;
        }
      }

      // Se sobrescribe el ARREGLO hacia el documento JSON.
    } catch (error) {
      this.products = [];
      return error.message;
    }
  };

  // Se declara funcion para obtener toda la lista:
  getProducts = async (limit) => {
    const productsJSON = await fs.promises.readFile(this.pathfile, "utf-8");
    this.products = JSON.parse(productsJSON) || [];
    if (!limit) return this.products;
    return this.products.slice(0, limit);
  };

  // Se declara funcion para obtener productos por ID:
  getProductByID = async (id) => {
    await this.getProducts();
    // TRY/CATCH para validar que el archivo JSON no este vacio:
    try {
      const productExist = this.products.find((p) => p.id === id); //Operacion para devolver el procucto con ID a una variable.
      let erroresDeLogica;
      if (!productExist) {
        erroresDeLogica = `No existe el producto con el ID: ${id}`;
        throw new Error(erroresDeLogica);
      } else {
        return productExist;
      }
    } catch (error) {
      return error.message;
    }
  };

  // Se declara funcion para modificar productos por ID:
  updateProduct = async (id, dataProduct) => {
    await this.getProducts();

    try {
      Object.entries(dataProduct).forEach(([k, v]) => {
        if (k === "stock" || k === "price") {
          dataProduct[k] = parseInt(v);
          if (isNaN(v)) {
            throw new Error(`${k} debe ser un numero.`);
          }
        }
      });
      const index = this.products.findIndex((p) => p.id === id); // Se busca el INDEX del producto que coincida con parametro ID.

      if (index < 0) {
        return `No existe el producto con el ID: ${id} para modificacion.`;
      } else {
        dataProduct.id = id; // Se rescribe el ID para que no cambie:

        this.products[index] = {
          ...this.products[index],
          ...dataProduct,
        };
        await fs.promises.writeFile(
          this.pathfile,
          JSON.stringify(this.products)
        ); // Se sobrescribe el ARREGLO hacia el documento JSON.
        return this.products[index];
      }
    } catch (error) {
      return error.message;
    }
  };

  // Se declara funcion para eliminar productos por ID:
  deleteProduct = async (id) => {
    await this.getProducts();
    try {
      const productExist = this.products.find((p) => p.id === id); // Se busca que el producto a eliminar exista (para log de error).

      if (!productExist) {
        throw new Error(`No existe el producto con el ID: ${id}`);
      } else {
        this.products = this.products.filter((p) => p.id !== id); // Funcion para FILTRAR (quitar) todo lo diferente al ID del parametro.
        await fs.promises.writeFile(
          this.pathfile,
          JSON.stringify(this.products)
        ); // Se sobrescribe el ARREGLO hacia el documento JSON.
        return this.products;
      }
    } catch (error) {
      return error.message;
    }
  };
}

const pMANAGER = new ProductManager(); // Se declara variable con la clase.
export default {
  addProducts: pMANAGER.addProducts.bind(),
  getProducts: pMANAGER.getProducts.bind(),
  getProductByID: pMANAGER.getProductByID.bind(),
  updateProduct: pMANAGER.updateProduct.bind(),
  deleteProduct: pMANAGER.deleteProduct.bind(),
};
