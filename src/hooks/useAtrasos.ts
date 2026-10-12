import { useState } from "react";
import { getAtrasos } from "../service/api";

export interface Atraso{
    id:number,
    aluno_id:number,
    data_hora: string,
    motivo:string,
    status_notificacao:string,
    nome:string,
    serie:string,
    responsavel:string,
    telefone_responsavel:string
}

export function useAtrasos(){
    const [atrasos, setAtrasos] = useState<Atraso[]>([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    async function buscarAtrasos(): Promise<Atraso[] | undefined>{
        setCarregando(true);
        setErro(null);

        try {
            const dados: Atraso[] = await getAtrasos();
            setAtrasos(dados);
            return dados;
        } catch (error) {
            setErro('Erro ao buscar atrasos');
            return undefined;
        }finally{
            setCarregando(false);
        }
    }
    return{
        atrasos,
        carregando,
        erro,
        buscarAtrasos
    }
}