import Seta from './Seta.jsx';

// CardProjeto: um projeto do Portfolio. Os dados chegam de fora, pelas props.
// Entre chaves, no parametro, os nomes das props que o card usa.
function CardProjeto({ nome, descricao, tecnologias, link_github, ano }) {
  return (
    <article className="card">
      <div className="card-topo">
        <span className="project-number" aria-hidden="true" />
        <p className="ano">{ano}</p>
      </div>
      <h3>{nome}</h3>
      <p className="descricao">{descricao}</p>
      <p className="meta"><span className="sr-only">Tecnologias: </span>{tecnologias}</p>
      <div className="card-rodape">
        {link_github ? (
          <a className="text-link" href={link_github} aria-label={`Ver repositório de ${nome}`}>
            Ver repositório <Seta />
          </a>
        ) : (
          <span className="sem-link">Link não informado</span>
        )}
      </div>
    </article>
  );
}

export default CardProjeto;
