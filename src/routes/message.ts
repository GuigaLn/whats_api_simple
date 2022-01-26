import { Router } from 'express';

import MessageController from '../controllers/MessageController';

const messageRouter = Router();

/*
* ROTAS RESPONSAVEIS PELA LISTAGEM DE MENSAGENS E ULTIMAS MENSAGENS
*/
messageRouter.get('/', MessageController.index);
messageRouter.post('/getByContato', MessageController.messageContato);

export default messageRouter;