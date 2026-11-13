import { useState } from 'react';
import Seta from './Seta.jsx';

// Contato: o formulario de contato do Portfolio.
// O que a pessoa digita fica no estado: uma variavel que o React lembra e vigia.
function Contato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [aviso, setAviso] = useState('');

  // enviar: roda quando o formulario e enviado. Por enquanto so avisa e limpa os campos.
  function enviar(e) {
    e.preventDefault();
    setAviso('Demonstração concluída' + (nome ? ', ' + nome : '') + '. Texto com ' + mensagem.length + ' caracteres. Nenhuma mensagem foi enviada.');
    setNome('');
    setEmail('');
    setMensagem('');
  }

  return (
    <section id="contato" className="contato" aria-labelledby="titulo-contato">
      <div className="container contato-grid">
        <div className="contato-intro">
          <p className="eyebrow">Contato</p>
          <h2 id="titulo-contato">Uma conversa<br />começa com um olá.</h2>
          <p>Uma ideia, uma dúvida ou algo para compartilhar? Este é o espaço para colocar em palavras.</p>
          <div className="nota-demo" id="nota-demo">
            <span className="eyebrow">Formulário de demonstração</span>
            <p>Feito como exercício em React. Você pode testar os campos: os dados ficam nesta página e nenhuma mensagem é enviada.</p>
          </div>
        </div>
        <div className="contato-formulario">
          <form onSubmit={enviar} aria-describedby="nota-demo">
            <div className="form-linha">
              <div className="campo">
                <label htmlFor="nome">Seu nome</label>
                <input id="nome" name="nome" autoComplete="name" value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>
              <div className="campo">
                <label htmlFor="email">Seu e-mail</label>
                <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="campo">
              <label htmlFor="mensagem">Sua mensagem</label>
              <textarea id="mensagem" name="mensagem" rows={5} aria-describedby="contagem" value={mensagem} onChange={(e) => setMensagem(e.target.value)} />
            </div>
            <div className="form-detalhes">
              <p>{nome ? `Olá, ${nome}.` : 'Pode escrever com calma.'}</p>
              <p id="contagem">{mensagem.length} caracteres</p>
            </div>
            <button type="submit">Simular envio <Seta /></button>
          </form>
          <p className="aviso" role="status" aria-atomic="true">{aviso}</p>
        </div>
      </div>
    </section>
  );
}

export default Contato;
