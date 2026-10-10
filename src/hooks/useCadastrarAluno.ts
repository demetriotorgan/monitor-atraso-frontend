import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { salvarAluno } from "../service/api";
import { validarAluno } from "../utils/validarAluno";

const formularioInicial = {
  nome: '',
  serie: '',
  responsavel: '',
  telefone: ''
}

type TipoMensagem = 'sucesso' | 'erro';

export function useCadastrarAluno() {
  const [formulario, setFormulario] = useState(formularioInicial);

  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState<TipoMensagem>('sucesso');

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    //Telefone aceita somente numeros
    if (name === 'telefone') {
      const telefoneNumerico = value
        .replace(/\D/g, '')
        .slice(0, 9); // Limita a 9 dígitos 

      setFormulario(prevFormulario => ({
        ...prevFormulario,
        telefone: telefoneNumerico
      }));
      return;
    }


    setFormulario(prevFormulario => ({
      ...prevFormulario,
      [name]: value
    }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //1. Validar os dados do formulário
    const erroValidacao = validarAluno(formulario);

    if(erroValidacao) {
      setTipoMensagem('erro');
      setMensagem(erroValidacao);
      return;
    }

    //2.Normalizar os dados do formulário
    const nome = formulario.nome.trim();
    const serie = formulario.serie.trim();
    const responsavel = formulario.responsavel.trim();
    const telefone = formulario.telefone.trim();    

    //3. Confirmar a ação do usuário
    const confirmar = window.confirm("Deseja realmente cadastrar este aluno?");
    if (!confirmar) {
      return;
    }

    //4. Enviar os dados para o backend
    setEnviando(true);
    setMensagem('');

    try {
      const novoAluno = {
        nome,
        serie,
        responsavel,
        telefone_responsavel: `5544${telefone}`
      };

      await salvarAluno(novoAluno);

      setTipoMensagem('sucesso');
      setMensagem('Aluno cadastrado com sucesso!');
      setFormulario(formularioInicial);

    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      setTipoMensagem('erro');
      setMensagem("Não foi possível cadastrar o aluno.");
    } finally {
      setEnviando(false);
    }
  }

  function fecharMensagem() {
    setMensagem('');
  }

  return {
    formulario,
    handleChange,
    handleSubmit,
    enviando,
    mensagem,
    tipoMensagem,
    fecharMensagem
  }
}