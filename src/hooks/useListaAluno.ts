import { useCallback, useEffect, useState } from "react";
import type { Aluno } from "./useAlunos";
import { useBuscarAluno } from "./useBuscarAluno";

interface UseBuscarAlunoProps {
    onSelecionarAluno?: (aluno: Aluno | null) => void;
}

export function useListaAluno({onSelecionarAluno}: UseBuscarAlunoProps={}){
    const [nome,setNome] = useState('');
    const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
    const [listaAberta, setListaAberta] = useState(false);
    const [aguardandoBusca, setAguardandoBusca] = useState(false);

    const {resultados, carregando, erro, buscarPorNome, limparBusca: limparResultados} = useBuscarAluno();
    
    useEffect(()=>{
        const termo = nome.trim();
        
        if(!termo || alunoSelecionado){
            limparResultados();
            setListaAberta(false);
            return
        }
        
        setAguardandoBusca(true);

        const temporizador = setTimeout(()=>{
            setAguardandoBusca(false);
            void buscarPorNome(termo);
        },300);
        return ()=> clearTimeout(temporizador);
    },[nome, alunoSelecionado, buscarPorNome, limparResultados]);

   const alterarBusca = useCallback((valor:string)=>{
        setNome(valor);
        setAlunoSelecionado(null);
        setListaAberta(Boolean(valor.trim()));

        limparResultados();
        onSelecionarAluno?.(null)
   },[limparResultados, onSelecionarAluno]);

   const selecionarAluno = useCallback(
        (aluno: Aluno)=>{
            setAlunoSelecionado(aluno);
            setNome(aluno.nome);
            setListaAberta(false);

            onSelecionarAluno?.(aluno)
        },[onSelecionarAluno]
    );
    
    
    const limparBusca = useCallback(()=>{
        setNome('');
        setAlunoSelecionado(null);
        setListaAberta(false);

        limparResultados();
        onSelecionarAluno?.(null);
    },[limparResultados, onSelecionarAluno]);

    const abrirLista = useCallback(()=>{
        if (nome.trim() && !alunoSelecionado){
            setListaAberta(true);
        }
    },[nome, alunoSelecionado])

    return{
        nome,
        alunoSelecionado,
        listaAberta,
        resultados,
        carregando: carregando || aguardandoBusca,
        erro,
        alterarBusca,
        selecionarAluno,
        limparBusca,
        abrirLista
    }
}