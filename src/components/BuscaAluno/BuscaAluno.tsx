import './BuscaAluno.css';
import { Clock, Search, X } from 'lucide-react';

import type { Aluno } from '../../hooks/useAlunos';
import { useListaAluno } from '../../hooks/useListaAluno';

interface BuscaAlunoProps {
    onSelecionarAluno?: (aluno: Aluno | null) => void;
}

const BuscaAluno = ({onSelecionarAluno}: BuscaAlunoProps) => {
    const {
        nome, 
        alunoSelecionado, 
        listaAberta, 
        resultados, 
        carregando, 
        erro, 
        alterarBusca, 
        selecionarAluno, 
        limparBusca, 
        abrirLista} = useListaAluno({onSelecionarAluno});

    return (
        <section className="busca-aluno">
            <label
                htmlFor="busca-aluno-input"
                className="busca-aluno__label"
            >
                Buscar aluno
            </label>

            <div className="busca-aluno__campo">
                <Search
                    size={20}
                    aria-hidden="true"
                />

                <input
                    id="busca-aluno-input"
                    type="text"
                    value={nome}
                    onChange={(evento) =>
                        alterarBusca(evento.target.value)
                    }
                    onFocus={abrirLista}
                    placeholder="Digite o nome do aluno"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-expanded={listaAberta}
                    aria-controls="busca-aluno-resultados"
                />

                {nome && (
                    <button
                        type="button"
                        className="busca-aluno__limpar"
                        onClick={limparBusca}
                        aria-label="Limpar busca"
                        title="Limpar busca"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            {listaAberta && !alunoSelecionado && (
                <div
                    id="busca-aluno-resultados"
                    className="busca-aluno__resultados"
                    role="listbox"
                    aria-label="Alunos encontrados"
                >
                    {carregando && (
                        <p className="busca-aluno__mensagem">
                            <Clock size={15} /> Buscando alunos...
                        </p>
                    )}

                    {!carregando && erro && (
                        <p className="busca-aluno__mensagem busca-aluno__mensagem--erro">
                            {erro}
                        </p>
                    )}

                    {!carregando &&
                        !erro &&
                        resultados.length === 0 && (
                            <p className="busca-aluno__mensagem">
                                Nenhum aluno encontrado.
                            </p>
                        )}

                    {!carregando &&
                        !erro &&
                        resultados.map((aluno) => (
                            <button
                                key={aluno.id}
                                type="button"
                                role="option"
                                aria-selected={false}
                                className="busca-aluno__opcao"
                                onClick={() =>
                                    selecionarAluno(aluno)
                                }
                            >
                                {aluno.nome}
                                <span>{aluno.serie}</span>
                            </button>
                        ))}
                </div>
            )}           
        </section>
    );
};

export default BuscaAluno;
