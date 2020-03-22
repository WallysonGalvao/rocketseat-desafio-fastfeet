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
routes.put('/deliveryman/:id/deliveries', DeliveriesController.update);

routes.get('/deliveryman/:id/deliveredorders', DeliveredOrderController.index);
routes.put('/deliveryman/:id/deliveredorders', DeliveredOrderController.update);

routes.get('/orders/:id', OrderController.show);

routes.get('/orders/:orderId/problems', DeliveryProblemController.show);
routes.post('/orders/problems', DeliveryProblemController.store);

routes.post('/files', upload.single('file'), FileController.store);
// _____________________________________________________________________________________________________________
/** Private Routes */
routes.use(authMiddleware);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);

routes.delete(
    '/problem/:orderId/cancel-delivery',
    DeliveryProblemController.delete
);

routes.get('/deliveryman/', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/orders/problems/list', DeliveryProblemController.index);

//

routes.get('/deliveryman/:id', DeliverymanController.show);

routes.put('/deliveryman/:id', DeliverymanController.update);

routes.get('/recipients/', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

export default routes;
