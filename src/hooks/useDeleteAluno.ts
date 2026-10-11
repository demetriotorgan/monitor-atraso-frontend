import { useState } from "react"
import { deleteAluno } from "../service/api";

export function useDeleteAluno(){
    const [loading, setloading] = useState(false);
    const [erro, setErro]=useState<string | null>(null)
    const [sucesso, setSucesso] = useState<string | null>(null);

    async function excluirAluno(id:number): Promise<boolean>{
        //Confirmar delete
            const confirmar = window.confirm("Deseja realmente excluir este registro?");
            if (!confirmar){
                return false;
            }
        try {            
            setloading(true);            
            await deleteAluno(id);
            setSucesso('Aluno excluido com sucesso!');
            return true;
        } catch (error) {
            setErro('Não foi possível excluir o aluno')
            throw error;
        }finally{
            setloading(false);
        }
    }

    function limparResultado(){
        setErro(null);
        setSucesso(null);
    }
    return{
        excluirAluno,
        loading,
        erro,
        sucesso,
        limparResultado
    }
}