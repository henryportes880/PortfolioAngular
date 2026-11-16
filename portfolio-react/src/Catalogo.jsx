import { useEffect, useState } from 'react';
import API from './api.js';

function Catalogo() {
  const [tecnologias, setTecnologias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const controle = new AbortController();

    async function buscarTecnologias() {
      try {
        const resposta = await fetch(API + '/api/tecnologias', { signal: controle.signal });
        if (!resposta.ok) {
          throw new Error('a API respondeu ' + resposta.status);
        }
        const dados = await resposta.json();
        if (!Array.isArray(dados)) {
          throw new Error('a API não retornou uma lista de tecnologias');
        }
        if (!controle.signal.aborted) setTecnologias(dados);
      } catch (falha) {
        if (!controle.signal.aborted) {
          setErro('Não deu para carregar as tecnologias: ' + falha.message);
        }
      } finally {
        if (!controle.signal.aborted) setCarregando(false);
      }
    }

    buscarTecnologias();
    return () => controle.abort();
  }, []);

  return (
    <section id="catalogo" className="catalogo" aria-labelledby="titulo-catalogo">
      <div className="container">
        <div className="section-heading central">
          <p className="eyebrow">Tecnologias</p>
          <h2 id="titulo-catalogo">Catálogo de tecnologias</h2>
        </div>
        {carregando && <p className="estado-pedido" role="status">Carregando tecnologias...</p>}
        {erro && <p className="estado-pedido erro" role="alert">{erro}</p>}
        {!carregando && !erro && tecnologias.length === 0 && (
          <p className="estado-pedido">Nenhuma tecnologia disponível ainda.</p>
        )}
        <ul className="catalogo-lista">
          {tecnologias.map((tecnologia) => (
            <li key={tecnologia.id}>
              <strong>{tecnologia.nome}</strong>
              <span>{tecnologia.categoria}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Catalogo;
