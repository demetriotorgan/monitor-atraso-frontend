import { useEffect, useState } from "react";
import { useAtrasos } from "../../hooks/useAtrasos"
import Spinner from "../Spinner/Spinner";
import Resultado from "../Resultado/Resultado";

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

  return (
    <section className="atarsos-list">
      <h2 className="atraso-list_titulo">Atrasos Registrados</h2>
      <div className="atraso-list_cards">
        {atrasos.length > 0 ? (
          atrasos.map((atraso) => (
            <div key={atraso.id}>
              <p>{atraso.nome}</p>
            </div>
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