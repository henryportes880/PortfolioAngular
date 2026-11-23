import Seta from './Seta.jsx';

function CardProjeto({ nome, descricao, tecnologias, link_github, ano }) {
  return (
    <article className="card">
      <div className="capa-projeto" aria-hidden="true">
        <span>{nome}</span>
      </div>
      <div className="card-corpo">
        <div className="card-topo">
          <h3>{nome}</h3>
          {ano != null && <p className="ano">{ano}</p>}
        </div>
        {descricao && <p className="descricao">{descricao}</p>}
        {tecnologias && <p className="meta"><span className="sr-only">Tecnologias: </span>{tecnologias}</p>}
        {link_github && (
          <div className="card-rodape">
            <a className="text-link" href={link_github} aria-label={`Ver repositório de ${nome}`}>
              Ver repositório <Seta />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

export default CardProjeto;
