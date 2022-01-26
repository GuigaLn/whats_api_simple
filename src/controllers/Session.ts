import { Client } from 'whatsapp-web.js';

import { ClientGlobal } from '../utils/GlobalVars';
import qrCode from 'qrcode-terminal';
import { saveMessage } from '../functions/saveMessage';

export function Sessions (token: string) {
    try {
        const client = new Client({ puppeteer: { headless: false } });

        client.on('qr', (qr) => {
            console.log('QR RECEIVED', qr);
            //qrCode.generate(qr, {small: true});
        });

        client.on('ready', () => {
            console.log(`${token} - Client is ready!`);
            ClientGlobal[token] = client;
        });

        client.on('authenticated', (session) => {
            console.log('AUTHENTICATED', session);
            //console.log(session);
        });

        client.on('auth_failure', (reason) => {
            console.log(`${token} - Client was logged out!`);
        });

        client.on('message', async msg => {
            if((await msg.getChat()).isGroup) {
                console.log("Group")
            } else {
                if(await saveMessage(msg.id.remote, msg.body, false, (await msg.getChat()).name) === true) {
                    console.log("Erro ao Salvar o Contato");
                } 
            }
        });

        client.on('disconnected', (reason) => {
            ClientGlobal[token] = undefined;
            console.log(`${token} - Client was logged out!`);
        });

        client.initialize();
    } catch (err) {
        
    }
}
