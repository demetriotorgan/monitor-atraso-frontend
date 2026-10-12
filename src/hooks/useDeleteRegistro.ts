import { useState } from "react"
import { deleteAtraso } from "../service/api";

export function useDeleteRegistro(){
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState<string | null>(null);
    const [sucesso, setSucesso] = useState<string | null>(null);

    async function excluirAtraso(id:number):Promise<boolean>{
        const confirmar = window.confirm("Deseja realmente excluir este registro de atraso?");
        if(!confirmar){
            return false;
        }
        
        setErro(null);
        setSucesso(null);
        setLoading(true);

        try {            
            await deleteAtraso(id);
            setSucesso('Registro de atraso excluído com sucesso!');
            return true;
        } catch (error) {
            setErro('Não foi possível excluir este registro')
            return false;
        }finally{
            setLoading(false);
        }
    }

    function limparResultado(){
        setErro(null);
        setSucesso(null);
    }
    return{
        excluirAtraso,
        loading,
        erro,
        sucesso,
        limparResultado
    }
}