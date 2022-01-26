import { Request, Response } from 'express';
import { validToken } from '../functions/validToken';

import { poolCallCenter } from "../utils/dbconfig";

/*
* CLASSE RESPONSAVEL POR LISTAR AS MENSAGENS
*/

class MessageController {
  /* LISTA AS SESSOES DE MENSAGENS ABERTAS BEM COMO SUA ULTIMA MENSAGEM */
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const sql = "SELECT cs.id, c.name, c.id_phone, (SELECT m.texto as msg FROM mensagens m WHERE id_contato_sessao = cs.id order by m.id desc limit 1) FROM contato_sessao_mensagens cs INNER JOIN contato c ON cs.id_contato = c.id WHERE cs.realizado = false";

      const { rows } = await poolCallCenter.query(sql);
      
      return res.json(rows);
    } catch (error) {
      console.log(error)
      return res.status(400).send(error);
    }
  }

  /* SELECIONA TODAS AS MENSAGENS DOS CONTATOS */
  public async messageContato (req: Request, res: Response): Promise<Response> {
    try {
      const idSessionContato = req.body.idSessionContato;

      /* VERIFICA SE FOI PASSADO UM ID DE SESSÃO DE MENSAGEM */
      if(idSessionContato === undefined || idSessionContato === null) { return res.json({ status: 400, msg: "ID Not Defined" }); }

      const sql = "select m.id, m.texto as msg, m.me, to_char(m.gerado , 'HH:mm:ss') as created_at from mensagens m where m.id_contato_sessao = $1";

      const { rows } = await poolCallCenter.query(sql, [ idSessionContato ]);
      
      return res.json(rows);
    } catch (error) {
      console.log(error)
      return res.status(400).send(error);
    }
  }
  
}


export default new MessageController();
