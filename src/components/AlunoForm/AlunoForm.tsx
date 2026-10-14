import { User } from "lucide-react"

import Spinner from "../Spinner/Spinner";
import Resultado from "../Resultado/Resultado";
import { useCadastrarAluno } from "../../hooks/useCadastrarAluno";

const AlunoForm = () => {
const {formulario, handleChange, handleSubmit, enviando, mensagem, tipoMensagem, fecharMensagem} = useCadastrarAluno();

  return (
    <>
    <Spinner loading={enviando} />

     <Resultado
      mensagem={mensagem}
      tipo={tipoMensagem}
      onClose={fecharMensagem}
    />

    <form className='painel-container' onSubmit={handleSubmit}>
      <h3><User /> Cadastrar Aluno </h3>

      <label className='form-label' htmlFor="nome">
        Nome: <span className='required'>*</span>
      </label>
      <input
        className='form-input'
        id="nome"
        name="nome"
        type="text"
        placeholder='Digite o nome do aluno'
        value={formulario.nome}
        onChange={handleChange}
        required
      />

      <label className='form-label' htmlFor="serie">
        Série: <span className='required'>*</span>
      </label>
      <select
        className='form-select'
        id="serie"
        name="serie"        
        value={formulario.serie}
        onChange={handleChange}
        required
      >
        <option value="" disabled>Selecione a série</option>
        <option value="6A">6A</option>
        <option value="6B">6B</option>
        <option value="7A">7A</option>
        <option value="7B">7B</option>
        <option value="8A">8A</option>
        <option value="8B">8B</option>
        <option value="9A">9A</option>
        <option value="9B">9B</option>
        <option value="1ANO">1ANO</option>
        <option value="1TDS">1TDS</option>
        <option value="1FD">1FD</option>
        <option value="1FD">1GAST.</option>
        <option value="2ANO">2ANO</option>
        <option value="2TDS">2TDS</option>
        <option value="1FD">2GAST.</option>
        <option value="2FD">2FD</option>
        <option value="3A">3A</option>
         <option value="3B">3B</option>
        <option value="3C">3C</option>
        <option value="3D">3D</option>
        <option value="3TDS">3TDS</option>
        <option value="3FD">3FD</option>
        <option value="1FD">3GAST.</option>       
      </select>

      <label className="form-label" htmlFor="responsavel">
        Nome do responsável: <span className='required'>*</span>
      </label>
      <input
        className="form-input"
        id="responsavel"
        name="responsavel"
        type="text"
        placeholder="Digite o nome do responsável"
        value={formulario.responsavel}
        onChange={handleChange}
        required
      />

      <label className="form-label" htmlFor="telefone">
        Telefone do responsável: <span className='required'>*</span>
      </label>
      <input
        className="form-input"
        id="telefone"
        name="telefone"
        type="tel"
        inputMode="numeric"
        maxLength={9}
        pattern="[0-9]{9}"
        placeholder="991594322"
        value={formulario.telefone}
        onChange={handleChange}
        required
      />
      <button 
      className="btn btn-primary"
      type="submit"
      disabled={enviando}
      >
        {enviando ? 'Enviando...' : 'Cadastrar Aluno'}
      </button>      
    </form>
    </>
  )
}

export default AlunoForm