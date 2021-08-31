import { Request, Response, NextFunction } from 'express';
import { carritoPersistencia } from '../persistencia/carrito';

class Carrito {
  
	checkProductCartExists(req: Request, res: Response, next: NextFunction) {
		const id = Number(req.params.id);
		const producto = carritoPersistencia.find(id);

		if (!producto) {
			return res.status(404).json({
				msg: 'producto not found in cart',
			});
		}
		next();
  }

  getCartProducts(req: Request, res: Response) {
    const id = Number(req.params.id);

    const producto = id
      ? carritoPersistencia.get(id)
      : carritoPersistencia.get();

    res.json({
      data: producto,
    });
  }

  addProducts(req: Request, res: Response) {
    const id = Number(req.params.id);
		const newItem = carritoPersistencia.add(id);

    res.json({
      msg: 'producto agregado con exito',
      data: newItem,
    });
  }

  deleteProducts(req: Request, res: Response) {
    const id = Number(req.params.id);

    carritoPersistencia.delete(id);
    res.json({
      msg: 'producto borrado',
    });
  }
}

export const carritoController = new Carrito();
