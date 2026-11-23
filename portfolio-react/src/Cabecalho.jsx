import { Link, NavLink } from 'react-router-dom';
import Seta from './Seta.jsx';

// Cabecalho: a barra de topo do Portfolio, com o nome e os links.
// Um componente e uma funcao que devolve JSX. O nome comeca com maiuscula.
function Cabecalho() {
  return (
    <header className="cabecalho container">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Link className="identidade" to="/" aria-label="Henry Portes — início">Henry Portes</Link>
      <nav aria-label="Navegação principal">
        <Link to="/">Início</Link>
        <Link to="/#projetos">Projetos</Link>
        <Link to="/#contato">Contato <Seta /></Link>
        <NavLink className="nav-gestao" to="/gestao">Gestão</NavLink>
      </nav>
    </header>
  );
}

export default Cabecalho;
