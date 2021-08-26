import { Router } from 'express';
import routerProductos from './routerProductos';
//import recurso2Router from './recurso2';

const miRouter = Router();

miRouter.use('/productos', routerProductos);
//miRouter.use('/recurso2', recurso2Router);

export default miRouter;
