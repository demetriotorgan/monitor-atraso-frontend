import './AtrasosList.css'
import { useEffect, useState } from "react";
import { useAtrasos } from "../../hooks/useAtrasos"
import Spinner from "../Spinner/Spinner";
import Resultado from "../Resultado/Resultado";
import AtrasoCard from "./AtrasoCard/AtrasoCard";
import { useDeleteRegistro } from '../../hooks/useDeleteRegistro';
import { ClipboardList } from 'lucide-react';

const AtrasosList = () => {
  const { atrasos, carregando, erro, buscarAtrasos } = useAtrasos();
  const { excluirAtraso, loading, erro: erroDeletar, sucesso, limparResultado } = useDeleteRegistro();
  const [mostrarResultado, setMostrarResultado] = useState(false);

  useEffect(() => {
    buscarAtrasos()
  }, []);

  useEffect(() => {
    if (erro || erroDeletar || sucesso) {
      setMostrarResultado(true);
    }
  }, [erro, erroDeletar, sucesso]);

  async function deletarAtraso(id: number) {
    const excluido = await excluirAtraso(id);
    if (excluido) {
      await buscarAtrasos();
    }
  }

  function fecharResultado() {
    setMostrarResultado(false);
    limparResultado();
  }

  const mensagemResultado = erroDeletar || sucesso || erro;

  const tipoResultado: 'sucesso' | 'erro' =
    erroDeletar || erro ? 'erro' : 'sucesso';

  if (carregando || loading) {
    return <Spinner loading={carregando} />
  }

  return (
    <section className="atarsos-list">
      <h2 className="atraso-list_titulo">Atrasos Registrados</h2>
      <div className="atraso-list_cards">
        {atrasos.length > 0 ? (
          atrasos.toReversed().map((atraso) => (
            <AtrasoCard
              key={atraso.id}
              atraso={atraso}
              onDelete={deletarAtraso}
            />
          ))
        ) : (
          <div className="atrasos-vazio">
            <div className="atrasos-vazio__icone">
              <ClipboardList size={32} />
            </div>
            <h3>Nenhum atraso registrado</h3>
            <p>
              Ainda não há registros de atrasos para exibir.
            </p>
          </div>
        )}
      </div>
      {mensagemResultado && mostrarResultado && (
        <Resultado
          mensagem={mensagemResultado}
          tipo={tipoResultado}
          onClose={fecharResultado}
        />
      )}
    </section>
  )
}

export default AtrasosList