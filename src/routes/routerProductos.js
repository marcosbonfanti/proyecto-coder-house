import { Router } from 'express';
import { socketService } from '../services/socket';
import { productosService } from '../services/productService';

const miRouter = Router();

miRouter.get('/listar', (req, res) => {
  let productos = productosService.getProducts();
  if(!productos.length){
    productos  = {error: "No hay productos"}
  }
  res.json(productos)
});

miRouter.get('/listar/:id', (req, res) => {
  res.json(productosService.getProductsById(req.params.id));
});

miRouter.post('/guardar', (req, res) => {
  const serviceRes = productosService.addProduct(req.body);
  
  const myWSServer = socketService.getServer();
  myWSServer.emit('products', serviceRes);

  res.json(serviceRes)
});

miRouter.put('/actualizar/:id', (req, res) => {
  const serviceRes = productosService.update(req.body, req.params.id)
  
  const myWSServer = socketService.getServer();
  myWSServer.emit('products', serviceRes);
  
  res.json(serviceRes);
});

miRouter.delete('/borrar/:id', (req, res) => {
  const serviceRes = productosService.delete(req.params.id)
  
  const myWSServer = socketService.getServer();
  myWSServer.emit('products', serviceRes);

  res.json(serviceRes);
});

// miRouter.get('/vista', (req, res) => {
//   res.json({
//     msg: 'LLAMADO GET RECURSO 1 guardar',
//   });
// });

export default miRouter;
