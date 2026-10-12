import './AtrasosList.css'
import { useEffect, useState } from "react";
import { useAtrasos } from "../../hooks/useAtrasos"
import Spinner from "../Spinner/Spinner";
import Resultado from "../Resultado/Resultado";
import AtrasoCard from "./AtrasoCard/AtrasoCard";

const AtrasosList = () => {
  const { atrasos, carregando, erro, buscarAtrasos } = useAtrasos();
  const [mostrarErro, setMostrarErro] = useState(false);

  useEffect(() => {
    buscarAtrasos()
  }, []);

  useEffect(() => {
    if (erro) {
      setMostrarErro(true);
    }
  }, [erro]);

  if (carregando) {
    return <Spinner loading={carregando} />
  }

  function deletarAtraso(id:number){
    console.log('Excluir registro', id);
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
          <p>Nenhum registro cadastrado</p>
        )}
      </div>
      {erro && mostrarErro && (
        <Resultado
          mensagem={erro}
          tipo='erro'
          onClose={() => setMostrarErro(false)}
        />
      )}
    </section>
  )
}

export default AtrasosList