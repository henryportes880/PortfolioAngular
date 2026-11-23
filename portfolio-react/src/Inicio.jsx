import { useEffect, useState } from 'react';
import API from './api.js';
import CardProjeto from './CardProjeto.jsx';
import Catalogo from './Catalogo.jsx';
import Contato from './Contato.jsx';
import Seta from './Seta.jsx';
import fotoEditorial from './assets/abertura-editorial.webp';

function Inicio() {
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
      <section id="inicio" className="apresentacao" aria-labelledby="titulo-inicio">
        <div className="container hero">
          <div className="hero-texto">
            <p className="rotulo">Portfólio</p>
            <h1 id="titulo-inicio">Henry<br />Portes<span aria-hidden="true" /></h1>
            <p className="hero-area">Desenvolvimento web</p>
            <a className="botao" href="#projetos">Ver projetos <Seta direcao="baixo" /></a>
          </div>
          <figure className="hero-foto">
            <img src={fotoEditorial} alt="" fetchPriority="high" />
            <figcaption>Imagem editorial criada com IA</figcaption>
          </figure>
        </div>
      </section>
      <section id="projetos" className="projetos" aria-labelledby="titulo-projetos">
        <div className="container">
          <div className="section-heading">
            <h2 id="titulo-projetos">Projetos</h2>
            <p>Estudos e projetos que desenvolvi na prática, do primeiro cadastro às APIs.</p>
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
      <section id="sobre" className="sobre" aria-labelledby="titulo-sobre">
        <div className="container sobre-grid">
          <h2 id="titulo-sobre">Sobre mim</h2>
          <div className="sobre-texto">
            <p>Sou Henry Portes, estudante do Técnico em Informática integrado ao ensino médio no IFPR — Campus Ponta Grossa.</p>
            <p>Trabalho com Angular, TypeScript e React no portfólio e estudo APIs com PHP, Node e MariaDB.</p>
          </div>
        </div>
      </section>
      <Contato />
    </>
  );
}

export default Inicio;
