import Seta from './Seta.jsx';

// Rodape: o fim da pagina, com a identidade e a formação.
function Rodape() {
  return (
    <footer className="rodape container">
      <div>
        <p className="rodape-nome">Henry Portes</p>
        <p>Aprendendo e construindo na web.</p>
      </div>
      <p className="rodape-escola">Técnico em Informática<br />IFPR — Campus Ponta Grossa</p>
      <a className="text-link" href="#inicio">Voltar ao início <Seta direcao="cima" /></a>
    </footer>
  );
}

export default Rodape;
