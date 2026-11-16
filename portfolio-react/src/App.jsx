import { useEffect, useState } from 'react';
import API from './api.js';
import Cabecalho from './Cabecalho.jsx';
import CardProjeto from './CardProjeto.jsx';
import Catalogo from './Catalogo.jsx';
import Contato from './Contato.jsx';
import Rodape from './Rodape.jsx';
import Seta from './Seta.jsx';

function App() {
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const controle = new AbortController();

    async function buscarProjetos() {
      try {
        const resposta = await fetch(API + '/api/projetos', { signal: controle.signal });
        if (!resposta.ok) {
          throw new Error('a API respondeu ' + resposta.status);
        }
        const dados = await resposta.json();
        if (!Array.isArray(dados)) {
          throw new Error('a API não retornou uma lista de projetos');
        }
        if (!controle.signal.aborted) setProjetos(dados);
      } catch (falha) {
        if (!controle.signal.aborted) {
          setErro('Não deu para carregar os projetos: ' + falha.message);
        }
      } finally {
        if (!controle.signal.aborted) setCarregando(false);
      }
    }

    buscarProjetos();
    // Cancela o pedido se a tela sair, inclusive na verificação do StrictMode.
    return () => controle.abort();
  }, []);

  return (
    <>
      <Cabecalho />
      <main id="conteudo" tabIndex={-1}>
        <section id="inicio" className="apresentacao" aria-labelledby="titulo-inicio">
          <div className="container hero-grid">
            <div className="hero-identidade">
              <p className="eyebrow">Portfólio pessoal</p>
              <p className="hero-nome">Henry<br />Portes<span>.</span></p>
              <p className="hero-area">Informática & desenvolvimento web</p>
            </div>
            <div className="hero-texto">
              <h1 id="titulo-inicio">Entre o código<br />e a curiosidade.</h1>
              <p>Sou Henry Portes, estudante do Técnico em Informática integrado ao ensino médio no IFPR — Campus Ponta Grossa.</p>
              <a className="botao" href="#projetos">Explore os projetos <Seta direcao="baixo" /></a>
            </div>
          </div>
        </section>

        <section id="sobre" className="sobre" aria-labelledby="titulo-sobre">
          <div className="container">
            <div className="section-heading central">
              <p className="eyebrow">Sobre mim</p>
              <h2 id="titulo-sobre">Aprendendo e construindo.</h2>
              <p>Este é meu espaço para reunir o que estudo e construo, um projeto de cada vez.</p>
            </div>
            <div className="sobre-grid">
              <article><span className="indice" aria-hidden="true">01</span><h3>Formação</h3><p>Técnico em Informática integrado ao ensino médio.</p><p>IFPR — Campus Ponta Grossa</p></article>
              <article><span className="indice" aria-hidden="true">02</span><h3>Desenvolvimento web</h3><p>Angular, TypeScript e React no portfólio. PHP, Node e MariaDB nos projetos de APIs.</p></article>
              <article><span className="indice" aria-hidden="true">03</span><h3>Estudo na prática</h3><p>Do primeiro cadastro à API: projetos que fazem parte do meu aprendizado.</p><a className="text-link" href="#projetos">Conheça os projetos <Seta /></a></article>
            </div>
          </div>
        </section>

        <section id="projetos" className="projetos" aria-labelledby="titulo-projetos">
          <div className="container">
            <div className="section-heading central">
              <p className="eyebrow">Projetos</p>
              <h2 id="titulo-projetos">Estudos que viram prática.</h2>
              <p>Projetos do meu aprendizado em desenvolvimento web.</p>
            </div>
            {carregando && <p className="estado-pedido" role="status">Carregando projetos...</p>}
            {erro && <p className="estado-pedido erro" role="alert">{erro}</p>}
            {!carregando && !erro && projetos.length === 0 && (
              <p className="estado-pedido">Nenhum projeto publicado ainda.</p>
            )}
            <div className="cards">
              {projetos.map((p) => (
                <CardProjeto key={p.id} nome={p.nome} descricao={p.descricao} tecnologias={p.tecnologias} link_github={p.link_github} ano={p.ano} />
              ))}
            </div>
          </div>
        </section>
        <Catalogo />
        <Contato />
      </main>
      <Rodape />
    </>
  );
}

export default App;
