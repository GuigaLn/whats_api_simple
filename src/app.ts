import express from 'express';
import cors from 'cors';

import routes from './routes/index';

import http from 'http';
import { poolCallCenter } from './utils/dbconfig';

class App {
  public app: express.Application;
  public httpServer: http.Server;

  /*
  * CONSTRUTOR 
  */
  public constructor () {
    this.app = express();

    this.middlewares();
    this.database();
    this.routes();
  }

  /*
  * CLASSE RESPONSAVEL POR USAR MIDDLEWARES
  */
  private middlewares (): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  /*
  * CLASSE RESPONSAVEL POR INICIAR O BANCO DE DADOS
  */
  private database (): void {
    poolCallCenter.connect(function (err: Error, client, done) {
      if(err) {
        console.log("Database Tickets Error!");
      } else {
        console.log('Database Tickets Connected!');
      }
    }); 
  }

  /*
  * CLASSE RESPONSAVEL POR USAR AS ROTAS
  */
  private routes (): void {
    this.app.use(routes);
  }
}

export default new App().app;
