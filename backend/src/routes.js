import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import OrderController from './app/controllers/OrderController';
import FileController from './app/controllers/FileController';
import DeliveriesController from './app/controllers/DeliveriesController';
import DeliveredOrderController from './app/controllers/DeliveredOrderController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);

routes.post('/session', SessionController.store);

routes.get('/deliveryman/:id', DeliverymanController.show);

routes.get('/deliveryman/:id/deliveries', DeliveriesController.index);

routes.get('/deliveryman/:id/deliveredorders', DeliveredOrderController.index);

/** Private Routes */
routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

routes.put('/deliveryman/:id/deliveredorders', DeliveredOrderController.update);

routes.put('/deliveryman/:id/deliveries', DeliveriesController.update);

routes.get('/orders', OrderController.index);
routes.get('/orders/:id', OrderController.show);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);

routes.get('/deliveryman/', DeliverymanController.index);
routes.get('/deliveryman/:id', DeliverymanController.show);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.get('/recipients/', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/orders/problems/list', DeliveryProblemController.index);
routes.post('/orders/problems', DeliveryProblemController.store);
routes.get('/orders/:orderId/problems', DeliveryProblemController.index);
routes.delete(
    '/problem/:orderId/cancel-delivery',
    DeliveryProblemController.delete
);

export default routes;
