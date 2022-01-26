import { Router } from 'express';

import ClientController from '../controllers/ClientController';

const clientRouter = Router();

/*
* ROTAS REPONSAVEIS PELA INTERAÇÃO COM O WHATS
*/
clientRouter.get('/', ClientController.initClient);
clientRouter.post('/sendMessage', ClientController.sendMessage);

export default clientRouter;