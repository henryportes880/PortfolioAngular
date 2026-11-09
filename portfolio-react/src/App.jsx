import Cabecalho from './Cabecalho.jsx';
import CardProjeto from './CardProjeto.jsx';
import Contato from './Contato.jsx';
import Rodape from './Rodape.jsx';
import projetos from './projetos.js';
import Seta from './Seta.jsx';

// App: o componente raiz. Ele monta a pagina com os outros componentes
function App() {
  return (
    <>
      <Cabecalho />
      <main id="conteudo" className="container" tabIndex={-1}>
        <section id="inicio" className="apresentacao" aria-labelledby="titulo-inicio">
          <div className="section-label">
            <p>Portfólio pessoal</p>
            <p>Informática & desenvolvimento web</p>
          </div>
          <h1 id="titulo-inicio">Entre o código<br />e a <em>curiosidade.</em></h1>
          <div className="apresentacao-base">
            <a className="text-link" href="#projetos">Explore os projetos <Seta direcao="baixo" /></a>
            <div className="apresentacao-texto">
              <p>Sou Henry Portes, estudante do Técnico em Informática integrado ao ensino médio no IFPR — Campus Ponta Grossa.</p>
              <p>Este é meu espaço para reunir o que estudo e construo, um projeto de cada vez.</p>
            </div>
          </div>
        </section>

        <section id="projetos" className="projetos" aria-labelledby="titulo-projetos">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / Projetos</p>
              <h2 id="titulo-projetos">Estudos que viram <em>prática.</em></h2>
            </div>
            <p>Do primeiro cadastro à API.<br />Quatro projetos do meu aprendizado.</p>
          </div>
          <div className="cards">
            {projetos.map((p) => (
              <CardProjeto
                key={p.id}
                nome={p.nome}
                descricao={p.descricao}
                tecnologias={p.tecnologias}
                link_github={p.link_github}
                ano={p.ano}
              />
            ))}
          </div>
        </section>
        <Contato />
      </main>
      <Rodape />
    </>
  );
}

export default App;
