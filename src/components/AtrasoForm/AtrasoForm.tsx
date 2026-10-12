
import { FileClock, FileText, SquarePen, UserPen } from 'lucide-react'
import './AtrasoForm.css'
import { useState } from 'react'
import type { Aluno } from '../../hooks/useAlunos';
import BuscaAluno from '../BuscaAluno/BuscaAluno';
import type { FormEvent } from "react";
import { registrarAtraso, type NovoAtraso } from '../../service/api';

type TipoMensagem = {
  tipo: 'sucesso' | 'erro',
  texto: string
}

const AtrasoForm = () => {
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null);
  const [motivo, setMotivo] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState<TipoMensagem | null>(null);

  async function handleSubmit(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (enviando) return
    if (!alunoSelecionado) {
      setMensagem({
        tipo: 'erro',
        texto: 'Selecione um aluno antes de registrar o atraso'
      });
      return;
    }

    const confirmar = window.confirm("Deseja realmente registrar esse atraso?");
    if (!confirmar) {
      return;
    }

    const motivoValidado = motivo.trim();    

    const novoAtraso: NovoAtraso = {
      aluno_id: alunoSelecionado.id,
      motivo: motivoValidado || 'O aluno não informou o motivo do atraso'
    }

    try {
      setEnviando(true);
      setMensagem(null);
      await registrarAtraso(novoAtraso);

      setMensagem({
        tipo: 'sucesso',
        texto: 'Atraso registrado com sucesso!'
      });
      setMotivo('');
    } catch (error) {
      setMensagem({
        tipo: 'erro',
        texto: 'Não foi possível salvar o registro de atraso'
      });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="atraso-form-container">
      <h2 className="atraso-form-title"><FileClock /> Registrar atraso</h2>

      <p className="atraso-form-description">
        Pesquise o aluno e preencha os dados do atraso.
      </p>

      <form className="atraso-form" onSubmit={handleSubmit}>
        {/* Busca do aluno */}
        <div className="atraso-form-field">
          <label className="form-label" htmlFor="buscar-aluno">
            <UserPen /> Nome do aluno
          </label>

          <BuscaAluno onSelecionarAluno={setAlunoSelecionado} />
        </div>

        {/* Dados do aluno selecionado */}
        <fieldset className="atraso-aluno-fieldset">
          <legend><FileText /> Dados do aluno</legend>

          <div className="atraso-form-field">
            <label className="form-label" htmlFor="nome-aluno">
              Nome
            </label>

            <input
              className="form-input"
              type="text"
              id="nome-aluno"
              name="nome-aluno"
              placeholder="Nome do aluno"
              readOnly
              value={alunoSelecionado?.nome ?? ''}
            />
          </div>

          <div className="atraso-form-field">
            <label className="form-label" htmlFor="serie-aluno">
              Série
            </label>

            <input
              className="form-input"
              type="text"
              id="serie-aluno"
              name="serie-aluno"
              placeholder="Série"
              readOnly
              value={alunoSelecionado?.serie ?? ''}
            />
          </div>

          <div className="atraso-form-field">
            <label className="form-label" htmlFor="responsavel-aluno">
              Responsável
            </label>

            <input
              className="form-input"
              type="text"
              id="responsavel-aluno"
              name="responsavel-aluno"
              placeholder="Nome do responsável"
              readOnly
              value={alunoSelecionado?.responsavel ?? ''}
            />
          </div>

          <div className="atraso-form-field">
            <label
              className="form-label"
              htmlFor="telefone-responsavel"
            >
              Telefone do responsável
            </label>

            <input
              className="form-input"
              type="tel"
              id="telefone-responsavel"
              name="telefone-responsavel"
              placeholder="Telefone do responsável"
              readOnly
              value={alunoSelecionado?.telefone_responsavel ?? ''}
            />
          </div>
        </fieldset>

        {/* Motivo do atraso */}
        <div className="atraso-form-field">
          <label className="form-label" htmlFor="motivo">
            <SquarePen /> Motivo do atraso
          </label>

          <textarea
            className="form-textarea"
            id="motivo"
            name="motivo"
            placeholder="Descreva o motivo do atraso..."
            rows={3}
            value={motivo}
            onChange={(evento) => {
              setMotivo(evento.target.value);
              setMensagem(null);
            }}
          />
        </div>

        {mensagem && (
          <p
            role="status"
            className={
              mensagem.tipo === 'erro'
                ? 'atraso-form-mensagem atraso-form-mensagem--erro'
                : 'atraso-form-mensagem atraso-form-mensagem--sucesso'
            }
          >
            {mensagem.texto}
          </p>
        )}

        <button className="btn btn-primary" type="submit" disabled={enviando}>
          {enviando ? 'Registrando...': 'Registrar atraso'}
        </button>
      </form>
    </section>
  )
}

export default AtrasoForm
