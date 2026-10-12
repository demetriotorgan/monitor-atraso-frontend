
import {
    CalendarClock,
    GraduationCap,
    UserRound,
    Phone,
    MessageSquareText,
    Hash,
    BellRing,
    Trash2,
} from "lucide-react";

import type { Atraso } from "../../../hooks/useAtrasos";

interface AtrasoCardProps {
    atraso: Atraso;
    onDelete:(id:number) => void;
}

function formatarDataHora(dataHora: string): string {
    const data = new Date(dataHora);

    if (Number.isNaN(data.getTime())) {
        return dataHora;
    }

    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(data);
}

const AtrasoCard = ({ atraso, onDelete }: AtrasoCardProps) => {
    const statusEnviada = atraso.status_notificacao === "ENVIADA";

    return (
        <article className="atraso-card">
            <header className="atraso-card__header">
                <div className="atraso-card__aluno">
                    <div className="atraso-card__avatar">
                        <UserRound size={24} />
                    </div>

                    <div className="atraso-card__identificacao">
                        <h3>{atraso.nome}</h3>
                        <span>
                            <Hash size={14} />
                            Registro {atraso.id}
                        </span>
                    </div>
                </div>

                <span
                    className={`atraso-card__status ${
                        statusEnviada
                            ? "atraso-card__status--enviada"
                            : "atraso-card__status--pendente"
                    }`}
                >
                    <BellRing size={15} />
                    {atraso.status_notificacao}
                </span>
            </header>

            <div className="atraso-card__data">
                <CalendarClock size={19} />
                <span>{formatarDataHora(atraso.data_hora)}</span>
            </div>

            <div className="atraso-card__conteudo">
                <div className="atraso-card__campo">
                    <GraduationCap size={19} />
                    <div>
                        <span className="atraso-card__label">
                            Turma
                        </span>
                        <p>{atraso.serie}</p>
                    </div>
                </div>

                <div className="atraso-card__campo atraso-card__motivo">
                    <MessageSquareText size={19} />
                    <div>
                        <span className="atraso-card__label">
                            Motivo do atraso
                        </span>
                        <p>{atraso.motivo}</p>
                    </div>
                </div>
            </div>

            <footer className="atraso-card__responsavel">
                <div className="atraso-card__campo">
                    <UserRound size={19} />
                    <div>
                        <span className="atraso-card__label">
                            Responsável
                        </span>
                        <p>{atraso.responsavel}</p>
                    </div>
                </div>

                <div className="atraso-card__campo">
                    <Phone size={18} />
                    <div>
                        <span className="atraso-card__label">
                            Telefone
                        </span>
                        <p>{atraso.telefone_responsavel}</p>
                    </div>
                </div>
            </footer>
             <div className="atraso-card__acoes">
                <button
                    type="button"
                    className="atraso-card__botao-delete"
                    onClick={() => onDelete(atraso.id)}
                    aria-label={`Excluir registro de atraso ${atraso.id}`}
                    title="Excluir registro"
                >
                    <Trash2 size={18} />
                    <span>Excluir registro</span>
                </button>
            </div>
        </article>
    );
};

export default AtrasoCard;
