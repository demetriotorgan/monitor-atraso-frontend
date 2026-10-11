import type { Aluno } from '../../../hooks/useAlunos';
import { CircleUserRound, Smartphone, Trash2 } from 'lucide-react';
import './AlunoCard.css';

interface AlunoCardProps {
    aluno: Aluno;
    onDelete?: (id: number) => void;
}

const AlunoCard = ({ aluno, onDelete }: AlunoCardProps) => {
    return (
        <article className="aluno-card">
            <div className="aluno-card__cabecalho">
                <h3 className="aluno-card__nome">
                    <div className='aluno-info'>
                        <CircleUserRound />
                        {aluno.nome}
                    </div>

                </h3>

                <span className="aluno-card__serie">
                    {aluno.serie}
                </span>
            </div>

            <div className="aluno-card__detalhes">
                <p>
                    <strong>Responsável:</strong>{' '}
                    {aluno.responsavel}
                </p>

                <div>
                    <strong>Telefone:</strong>{' '}
                    <span className="aluno-info">
                        <Smartphone />
                        {aluno.telefone_responsavel}
                    </span>
                </div>
            </div>

            <div className="aluno-card__acoes">
                <button
                    type="button"
                    className="aluno-card__botao-excluir"
                    disabled={!onDelete}
                    onClick={() => onDelete?.(aluno.id)}
                    aria-label={`Excluir aluno ${aluno.nome}`}
                    title="Excluir aluno"
                >
                    <Trash2 size={18} aria-hidden="true" />
                    <span>Excluir</span>
                </button>
            </div>
        </article>
    );
};

export default AlunoCard;