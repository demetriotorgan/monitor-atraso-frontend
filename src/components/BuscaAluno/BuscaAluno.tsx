import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';

import { useBuscarAluno } from '../../hooks/useBuscarAluno';
import type { Aluno } from '../../hooks/useAlunos';

import './BuscaAluno.css';

interface BuscaAlunoProps {
    onSelecionarAluno?: (aluno: Aluno | null) => void;
}

const BuscaAluno = ({
    onSelecionarAluno,
}: BuscaAlunoProps) => {
    const [nome, setNome] = useState('');
    const [alunoSelecionado, setAlunoSelecionado] =
        useState<Aluno | null>(null);
    const [listaAberta, setListaAberta] = useState(false);

    const { resultados, carregando, erro, buscarPorNome, limparBusca } =
        useBuscarAluno();

    useEffect(() => {
        const termo = nome.trim();

        if (!termo || alunoSelecionado) {
            limparBusca();
            setListaAberta(false);
            return;
        }

        const temporizador = setTimeout(() => {
            void buscarPorNome(termo);
            setListaAberta(true);
        }, 300);

        return () => clearTimeout(temporizador);
    }, [nome, alunoSelecionado, buscarPorNome, limparBusca]);

    function handleSelecionarAluno(aluno: Aluno) {
        setAlunoSelecionado(aluno);
        setNome(aluno.nome);
        setListaAberta(false);

        onSelecionarAluno?.(aluno);
    }

    function handleAlterarBusca(valor: string) {
        setNome(valor);
        setAlunoSelecionado(null);
        setListaAberta(Boolean(valor.trim()));

        onSelecionarAluno?.(null);
    }

    function handleLimparBusca() {
        setNome('');
        setAlunoSelecionado(null);
        setListaAberta(false);
        limparBusca();

        onSelecionarAluno?.(null);
    }

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
                        handleAlterarBusca(evento.target.value)
                    }
                    onFocus={() => {
                        if (nome.trim() && !alunoSelecionado) {
                            setListaAberta(true);
                        }
                    }}
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
                        onClick={handleLimparBusca}
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
                            Buscando alunos...
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
                                    handleSelecionarAluno(aluno)
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
