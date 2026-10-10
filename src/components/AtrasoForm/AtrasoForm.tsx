
import { FileClock, FileText, SquarePen, UserPen } from 'lucide-react'
import './AtrasoForm.css'

const AtrasoForm = () => {
  return (
    <section className="atraso-form-container">
      <h2 className="atraso-form-title"><FileClock /> Registrar atraso</h2>

      <p className="atraso-form-description">
        Pesquise o aluno e preencha os dados do atraso.
      </p>

      <form className="atraso-form">
        {/* Busca do aluno */}
        <div className="atraso-form-field">
          <label className="form-label" htmlFor="buscar-aluno">
            <UserPen /> Nome do aluno
          </label>

          <input
            className="form-input"
            type="text"
            id="buscar-aluno"
            name="buscar-aluno"
            placeholder="Digite o nome do aluno..."
            autoComplete="off"
          />
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
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Registrar atraso
        </button>
      </form>
    </section>
  )
}

export default AtrasoForm
