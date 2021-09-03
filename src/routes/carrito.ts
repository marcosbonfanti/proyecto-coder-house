import { Router } from 'express';
import { carritoController } from '../controllers/carrito';
import { productsController } from '../controllers/productos';

const router = Router();

router.get('/', carritoController.getCartProducts);

router.get(
  '/:id',
  carritoController.getCartProducts
);

router.post(
  '/:id',
  carritoController.addProducts
);

router.delete(
  '/:id',
  carritoController.deleteProducts
);

export default router;
