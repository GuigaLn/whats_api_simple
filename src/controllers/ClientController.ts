import { Request, Response } from 'express';
import { validToken } from '../functions/validToken';
import { sendMessage } from '../functions/sendMessage';
import { Sessions } from './Session';

import moment from 'moment';

import { ClientGlobal } from '../utils/GlobalVars';

/*
* CLASSE RESPONSAVEL POR INICIAR O CLIENT DO WHATSAPP BEM COMO ENVIAR MENSAGENS 
*/

class ClientController {
  /* INICIA O CLIENT */
  public async initClient (req: Request, res: Response): Promise<Response> {
    try {
      let token = req.body.token;

      /* VALIDA O TOKEN */
      if(await validToken(token) === false) { return res.json({ status: 401, msg: "Not Autorized" }); }

      /* VERIFICA SE JA NÃO EXISTE UM CLIENT CONNECTADO COM O MESMO TOKEN */
      if(ClientGlobal[token] !== undefined && ClientGlobal[token] !== null) {
        return res.json({ status: 202, msg: "Client Has Connected" });
      }
      
      /* INICIA O TOKEN */
      Sessions(token);
      
      return res.json({ status: 200, msg: "Success" });
    } catch (error) {
      console.log(error)
      return res.status(400).send(error);
    }
  }

  /* ENVIA A MENSAGEM */
  public async sendMessage (req: Request, res: Response): Promise<Response> {
    try {
      let token = req.body.token;

      /* VALIDA O TOKEN */
      if(await validToken(token) === false) { return res.json({ status: 401, msg: "Not Autorized" }); }

      /* VERIFICA SE EXISTE UM CLIENT CONNECTADO COM O TOKEN */
      if(ClientGlobal[token] === undefined || ClientGlobal[token] === null) {
        return res.json({ status: 202, msg: "Client Not Connected" });
      }

      /* ENVIA A MENSAGEM */
      const idReturningMessage = await sendMessage(token, req.body.idPhone, req.body.msg);
      if(idReturningMessage === false) { return res.json({ status: 401, msg: "Error To Send Message" })};
      
      /* RETORNA A MENSAGEM PARA USAR NO FRONTEND */
      return res.json({ id: idReturningMessage, created_at: moment().format('HH:mm:ss') });
    } catch (error) {
      console.log(error)
      return res.status(400).send(error);
    }
  }
  
}


export default new ClientController();
