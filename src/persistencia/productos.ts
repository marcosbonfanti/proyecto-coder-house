import { mySQLDB } from '../services/db';

interface newProduct {
  nombre: string;
  precio: number;
}

interface Product {
  id: number;
  nombre: string;
  precio: number;
}

class ProductosSQL {

  async get(id: number){
    return mySQLDB.from('productos').where({ id: id }).select();
  }

  async getAll() {
    return mySQLDB.from('productos').select();
  }

  async add(data: newProduct) {
    return mySQLDB('productos').insert(data);
  }

  async update(id:number, data: newProduct) {
    return mySQLDB.from('productos').where({ id }).update(data);
  }

  async delete(id: number) {
    return mySQLDB.from('productos').where({ id }).del();
  }
  
  async query(query: object) {
    return mySQLDB.from('productos').where(query);
  }

}

export const productosSQL = new ProductosSQL();
