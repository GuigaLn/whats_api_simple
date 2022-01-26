import { Router } from 'express';

import clientRouter from './client';
import messageRouter from './message';

const routers = Router();

/*
*   INICIA AS ROTAS
*/
routers.use('/client', clientRouter);
routers.use('/message', messageRouter);

export default routers;
