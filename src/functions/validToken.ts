import { poolCallCenter } from "../utils/dbconfig";

/*
* FUNÇÃO RESPONSAVEL PELA VALIDAÇÃO DO TOKEN DE ACESSO
*/
export async function validToken ( token: string,  ) {
    if(token === undefined || token === null) { return false }

    const sql = "SELECT id FROM sessao WHERE token = $1";

    const { rows } = await poolCallCenter.query(sql, [ token ]);

    if( rows.length === 1) {
        return true;
    }
    
    return false;
}