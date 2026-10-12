import { useEffect, useState } from 'react';
import { useAlunos } from '../../hooks/useAlunos';
import type { Aluno } from '../../hooks/useAlunos';

import './AlunoList.css';
import Spinner from '../Spinner/Spinner';
import AlunoCard from './AlunoCard/AlunoCard';
import BuscaAluno from '../BuscaAluno/BuscaAluno';
import { useDeleteAluno } from '../../hooks/useDeleteAluno';
import Resultado from '../Resultado/Resultado';

const AlunoList = () => {
    const {
        alunos,
        carregando,
        erro,
        buscarAlunos,
    } = useAlunos();

    const {
        excluirAluno,
        loading,
        erro: erroDelete,
        sucesso,
        limparResultado,
    } = useDeleteAluno();

    const [alunoSelecionado, setAlunoSelecionado] =
        useState<Aluno | null>(null);
    
    const [mostrarErro, setMostrarErro] = useState(false);

    useEffect(() => {
        buscarAlunos();
    }, []);

    useEffect(()=>{
        if(erro){
            setMostrarErro(true);
        }
    },[erro]);

    async function handleDelete(id: number) {
        try {
            const excluido = await excluirAluno(id);

            if (excluido) {
                if (alunoSelecionado?.id === id) {
                    setAlunoSelecionado(null);
                }

                await buscarAlunos();
            }
        } catch {
            // O hook de exclusão trata o resultado da operação.
        }
    }

    if (carregando) {
        return <Spinner loading={carregando} />;
    }

    if (loading) {
        return <Spinner loading={loading} />;
    }

    const alunosExibidos = alunoSelecionado
        ? [alunoSelecionado]
        : alunos.toReversed();
    

     const mensagemResultado =
        erroDelete ?? sucesso ?? (mostrarErro ? erro : null);

      const tipoResultado =
        erroDelete || (mostrarErro && erro)
            ? 'erro'
            : 'sucesso';

    function fecharResultado(){
        if(erroDelete || sucesso){
            limparResultado();
        }else{
            setMostrarErro(false);
        }
    }

    return (
        <>
            <section className="aluno-list">
                <h2 className="aluno-list__titulo">
                    Alunos cadastrados
                </h2>

                <BuscaAluno
                    onSelecionarAluno={setAlunoSelecionado}
                />

                <div className="aluno-list__cards">
                    {alunosExibidos.length > 0 ? (
                        alunosExibidos.map((aluno) => (
                            <AlunoCard
                                key={aluno.id}
                                aluno={aluno}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <p>Nenhum aluno cadastrado.</p>
                    )}
                </div>
            </section>

            {mensagemResultado && (
                <Resultado
                    mensagem={mensagemResultado}
                    tipo={tipoResultado}
                    onClose={fecharResultado}
                />
            )}
        </>
    );
};

export default AlunoList;
