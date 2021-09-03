import { productosSQL } from '../persistencia/productos'

let productosCarrito = [
  { id: 1, nombre: 'lapiz', precio: 200 },
  { id: 2, nombre: 'lapiz2', precio: 250 }
  ];

interface Product {
  id: number;
  nombre: string;
  precio: number;
}

class Carrito {
  find(id: number): Product | undefined {
	  return productosCarrito.find((aProduct) => aProduct.id === Number(id));
	}

  get(id?: number) {
    if (id) {
      return productosCarrito.filter((aProduct) => aProduct.id === id);
    }
    return productosCarrito;
  }

	add(id: number) {
		const productData = productosSQL.get(id);
		const newCartItem = {
			id: productosCarrito.length + 1,
			nombre: productData[0].nombre,
			precio: productData[0].precio
		}
		productosCarrito.push(newCartItem);
		return newCartItem;
	}

	delete(id: number) {
		productosCarrito = productosCarrito.filter((aProduct) => aProduct.id !== id);
		return productosCarrito;
	}
}

export const carritoPersistencia = new Carrito();  