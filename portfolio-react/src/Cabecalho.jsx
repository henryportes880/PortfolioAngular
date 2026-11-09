import Seta from './Seta.jsx';

// Cabecalho: a barra de topo do Portfolio, com o nome e os links.
// Um componente e uma funcao que devolve JSX. O nome comeca com maiuscula.
function Cabecalho() {
  return (
    <header className="cabecalho container">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <a className="identidade" href="#inicio" aria-label="Henry Portes — início">
        <span className="monograma" aria-hidden="true">hp.</span>
        <span>Henry Portes</span>
      </a>
      <nav aria-label="Navegação principal">
        <a href="#inicio">Início</a>
        <a href="#projetos">Projetos</a>
        <a href="#contato">Contato <Seta /></a>
      </nav>
    </header>
  );
}

export default Cabecalho;
