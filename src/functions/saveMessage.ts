import { poolCallCenter } from "../utils/dbconfig";

/*
* ROTA RESPONSAVEL POR SALVAR A MENSAGEM
* INVOCA UM FUNÇÃO EXISTENTE NO POSTGRESQL, O QUAL FAZ TODA VALIDAÇÃO
*/
export async function saveMessage ( idPhone: string, msg: string, forme: boolean, name?: string ) {
    try {
        if(name === null || name === undefined) { name = 'No Name' }
        const sql = "SELECT salvar_mensagem($1, $2, $3, $4);";

        const { rows } = await poolCallCenter.query(sql, [ idPhone,  name, msg, forme ]);
        
        return rows[0];
    } catch (err) {
        console.log(err)
        return false;
    }   
}