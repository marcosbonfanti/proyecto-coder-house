let productos = [];
let contador = 0;

class Productos {
  getProducts() {
    return productos;
  }
  
  addProduct(productAdd) {
    contador++;
    productAdd["id"] = contador;
    productos.push(productAdd);
    return productos;
  }
  
  getProductsById(id) {
    if (productos.find((o) => o.id == id) == undefined) {
      return { "Error": "Producto no encontrado" };
    } else {
      return productos.find((o) => o.id == id);
    }
  }

  update(productAdd, id) {
    if(productos.find(o => o.id ==  id) == undefined){
        return {"Error": "Producto no encontrado"};
    }    
    else {
        const index = productos.findIndex(o => o.id ==  id);
        productAdd['id'] = parseInt(id);
        productos[index] = productAdd;
        return productos
    }
  }

  delete(id) {
    if(productos.find(o => o.id ==  id) == undefined){
        return {"error": "Producto no encontrado"};
    }    
    else {
        const index = productos.findIndex(o => o.id ==  id);
        productos.splice(index, 1);
        return productos
    }
  }    

}

export const productosService = new Productos();
