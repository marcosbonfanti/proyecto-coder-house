let productos = [
  { id: 1, nombre: 'lapiz', precio: 200 },
  { id: 2, nombre: 'lapiz2', precio: 250 },
  { id: 3, nombre: 'lapiz3', precio: 260 },
];

interface newProduct {
  nombre: string;
  precio: number;
}

interface Product {
  id: number;
  nombre: string;
  precio: number;
}

class Productos {
  find(id: number): Product | undefined {
    return productos.find((aProduct) => aProduct.id === Number(id));
  }

  get(id?: number) {
    if (id) {
      return productos.filter((aProduct) => aProduct.id === id);
    }
    return productos;
  }

  add(data: newProduct) {
    const newItem: Product = {
      id: productos.length + 1,
      nombre: data.nombre,
      precio: data.precio,
    };

    productos.push(newItem);

    return newItem;
  }

  update(id: number, data: newProduct){
    const newItem: Product = {
      id: id,
      nombre: data.nombre,
      precio: data.precio,
    };
    productos[productos.findIndex(o => o.id ==  id)] = newItem;

  }

  delete(id: number) {
    productos = productos.filter((aProduct) => aProduct.id !== id);
    return productos;
  }
}

export const productsPersistencia = new Productos();
