import { useCallback, useRef, useState } from 'react';
import type { Aluno } from './useAlunos';
import { buscarAlunoPorNome } from '../service/api';

export function useBuscarAluno() {
    const [resultados, setResultados] = useState<Aluno[]>([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    const ultimaBusca = useRef(0);

    const buscarPorNome = useCallback(async (nome:string)=>{
        const termo = nome.trim();
        const idBusca = ++ultimaBusca.current;

        if (!termo) {
            setResultados([]);
            setCarregando(false);
            setErro(null);
            return;
        }

        setCarregando(true);
        setErro(null);

        try {
            const alunos: Aluno[] = await buscarAlunoPorNome(termo);

            if (idBusca !== ultimaBusca.current) {
                return;
            }

            setResultados(alunos);
        } catch {
            if (idBusca !== ultimaBusca.current) {
                return;
            }

            setResultados([]);
            setErro('Não foi possível buscar os alunos.');
        } finally {
            if (idBusca === ultimaBusca.current) {
                setCarregando(false);
            }
        }
    },[])

    const limparBusca = useCallback(()=>{
        ultimaBusca.current++;
        setResultados([]);
        setCarregando(false);
        setErro(null);
    },[])

    return {
        resultados,
        carregando,
        erro,
        buscarPorNome,
        limparBusca,
    };
}
