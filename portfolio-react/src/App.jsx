import { useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Cabecalho from './Cabecalho.jsx';
import Gestao from './Gestao.jsx';
import Inicio from './Inicio.jsx';
import Rodape from './Rodape.jsx';

function App() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, key]);

  return (
    <>
      <Cabecalho />
      <main id="conteudo" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/gestao" element={<Gestao />} />
          <Route path="*" element={
            <section className="container pagina-interna">
              <h1>Endereço não encontrado</h1>
              <Link className="text-link" to="/">Voltar ao Início</Link>
            </section>
          } />
        </Routes>
      </main>
      <Rodape />
    </>
  );
}

export default App;
