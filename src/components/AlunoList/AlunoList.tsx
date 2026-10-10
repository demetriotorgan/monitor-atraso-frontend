import { useEffect } from 'react';
import { useAlunos } from '../../hooks/useAlunos';
import './AlunoList.css'
import Spinner from '../Spinner/Spinner';
import AlunoCard from './AlunoCard/AlunoCard';

const AlunoList = () => {
    const { alunos, carregando, erro, buscarAlunos } = useAlunos();

    useEffect(() => {
        buscarAlunos().catch(() => { })
    }, []);

    if (carregando) {
        <Spinner loading={carregando} />
    }

    if (erro) {
        return <p>{erro}</p>
    }

    if (alunos.length === 0) {
        return <p>Nenhum aluno cadastrado</p>
    }

    return (
        <section className="aluno-list">
            <h2 className="aluno-list__titulo">Alunos cadastrados</h2>

            <div className="aluno-list__cards">
                {alunos.map((aluno)=>(
                    <AlunoCard
                        key={aluno.id}
                        aluno={aluno}
                    />
                ))}
            </div>
        </section>
    )
}

export default AlunoList