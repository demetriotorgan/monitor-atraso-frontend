import { useState } from "react";
import { getAlunos } from "../service/api";

export interface Aluno{
    id:number, 
    nome:string, 
    serie:string,
    responsavel:string,
    telefone_responsavel:string
}

export function useAlunos(){
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    async function buscarAlunos(): Promise<Aluno[] | undefined> {
        setCarregando(true);
        setErro(null);

        try {
        const dados: Aluno[] = await getAlunos();    
        setAlunos(dados);
        return dados;
        } catch (error) {
            setErro('Erro ao buscar alunos');  
            return undefined;          
        }finally {
            setCarregando(false);
        }
    }
    return{
        alunos,
        carregando,
        erro,
        buscarAlunos
    }
}