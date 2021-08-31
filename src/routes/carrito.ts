import { Router } from 'express';
import { carritoController } from '../controllers/carrito';
import { productsController } from '../controllers/productos';

const router = Router();

router.get('/', carritoController.getCartProducts);

router.get(
  '/:id',
  carritoController.checkProductCartExists,
  carritoController.getCartProducts
);

router.post(
  '/:id',
  productsController.checkProductExists,
  carritoController.addProducts
);

router.delete(
  '/:id',
  carritoController.checkProductCartExists,
  carritoController.deleteProducts
);

export default router;
