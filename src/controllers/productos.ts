import { Request, Response, NextFunction } from 'express';
import { productosSQL } from '../persistencia/productos';


class Producto {
  checkAddProducts(req: Request, res: Response, next: NextFunction) {
    const { nombre, precio } = req.body;

    if (!nombre || !precio || typeof nombre !== 'string' || isNaN(precio)) {
      return res.status(400).json({
        msg: 'Campos del body invalidos',
      });
    }

    next();
  }

  getProducts(req: Request, res: Response) {
    const id = Number(req.params.id);

    id
      ? productosSQL.get(id).then((data) => res.json(data))
      : productosSQL.getAll().then((data) => res.json(data));

  }

  addProducts(req: Request, res: Response) {    
    productosSQL.add(req.body).then((data) => {
      res.json({
        msg: 'producto agregado con exito',
        data: data,
      });
      })

  }

  updateProducts(req: Request, res: Response) {
    const id = Number(req.params.id);
    
    productosSQL.update(id, req.body).then((data) => {
      res.json({
        msg: 'actualizando producto',
        data: data
      });
    });

  }

  deleteProducts(req: Request, res: Response) {
    const id = Number(req.params.id);

    productosSQL.delete(id).then((data) => {
      res.json({
        msg: 'Borrando producto',
        data: data
      });
    });
  }
}

export const productsController = new Producto();
