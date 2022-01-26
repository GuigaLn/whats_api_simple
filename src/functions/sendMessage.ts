import { ClientGlobal } from '../utils/GlobalVars';
import { saveMessage } from './saveMessage';

/*
* ROTA RESPONSAVEL PELO ENVIO DE MENSAGEM ATRAVÉS DO WHATS
*/
export async function sendMessage(token: string, idPhone: string, msg: string) {
    try {
        if( await ClientGlobal[token].sendMessage(idPhone, msg)) {
            // CASO ENVIE A MENSAGEM, IRÁ SALVAR
            const idReturnMessage = await saveMessage(idPhone, msg, true);
            
            if(idReturnMessage !== 'error') return idReturnMessage;

            return false;   
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}