import { useEffect, useRef, useState } from 'react';
import API from './api.js';
import FormProjeto from './FormProjeto.jsx';

async function lerResposta(resposta) {
  if (resposta.status === 204) return;
  const dados = await resposta.json().catch(() => null);
  if (!resposta.ok) {
    throw new Error(dados?.erro || 'a API respondeu ' + resposta.status);
  }
  return dados;
}

function PainelProjetos({ token, encerrarSessao }) {
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroLista, setErroLista] = useState('');
  const [erro, setErro] = useState('');
  const [aviso, setAviso] = useState('');
  const [editando, setEditando] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [versao, setVersao] = useState(0);

  useEffect(() => {
    const controle = new AbortController();

    async function buscar() {
      try {
        const resposta = await fetch(API + '/api/projetos', { signal: controle.signal });
        const dados = await lerResposta(resposta);
        if (!Array.isArray(dados)) throw new Error('a API não retornou uma lista de projetos');
        if (!controle.signal.aborted) setProjetos(dados);
      } catch (falha) {
        if (!controle.signal.aborted) setErroLista('Não deu para carregar os projetos: ' + falha.message);
      } finally {
        if (!controle.signal.aborted) setCarregando(false);
      }
    }

    buscar();
    return () => controle.abort();
  }, [versao]);

  async function escrever(metodo, id, dados) {
    setErro('');
    setAviso('');
    setEnviando(true);

    try {
      const headers = { Authorization: 'Bearer ' + token };
      const opcoes = { method: metodo, headers };
      if (dados) {
        headers['Content-Type'] = 'application/json';
        opcoes.body = JSON.stringify(dados);
      }

      const caminho = id == null ? '/api/projetos' : '/api/projetos/' + id;
      const resposta = await fetch(API + caminho, opcoes);
      if (resposta.status === 401) {
        encerrarSessao('Sua sessão expirou ou está inválida. Entre novamente.', token);
        return false;
      }

      const resultado = await lerResposta(resposta);
      const mensagens = {
        POST: 'Projeto ' + resultado?.id + ' cadastrado.',
        PUT: 'Projeto atualizado.',
        DELETE: 'Projeto excluído.',
      };
      setAviso(mensagens[metodo]);
      if (metodo === 'PUT' || editando?.id === id) setEditando(null);
      setErroLista('');
      setCarregando(true);
      setVersao((anterior) => anterior + 1);
      return true;
    } catch (falha) {
      setErro('Não deu para concluir: ' + falha.message);
      return false;
    } finally {
      setEnviando(false);
    }
  }

  function excluir(projeto) {
    if (window.confirm('Excluir o projeto “' + projeto.nome + '”?')) {
      escrever('DELETE', projeto.id);
    }
  }

  return (
    <div className="gestao-painel">
      <div>
        <FormProjeto
          key={editando?.id ?? 'novo'}
          projeto={editando}
          bloqueado={enviando}
          cancelar={() => setEditando(null)}
          salvar={(dados) => editando
            ? escrever('PUT', editando.id, dados)
            : escrever('POST', null, { ...dados, status: 'publicado' })}
        />
        {aviso && <p className="estado-pedido" role="status">{aviso}</p>}
        {erro && <p className="estado-pedido erro" role="alert">{erro}</p>}
      </div>

      <section className="gestao-publicados" aria-labelledby="titulo-publicados">
        <h2 id="titulo-publicados">Projetos publicados</h2>
        {carregando && <p className="estado-pedido" role="status">Carregando projetos...</p>}
        {erroLista && <p className="estado-pedido erro" role="alert">{erroLista}</p>}
        {!carregando && !erroLista && projetos.length === 0 && <p className="estado-pedido">Nenhum projeto publicado ainda.</p>}
        <ul className="gestao-lista">
          {projetos.map((projeto) => (
            <li key={projeto.id}>
              <strong>{projeto.nome}</strong>
              <div className="gestao-acoes">
                <button className="botao-secundario" type="button" disabled={enviando || carregando} onClick={() => setEditando(projeto)}>Editar</button>
                <button className="botao-perigo" type="button" disabled={enviando || carregando} onClick={() => excluir(projeto)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Gestao() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [erro, setErro] = useState('');
  const [entrando, setEntrando] = useState(false);
  const pedidoLogin = useRef(null);

  useEffect(() => () => pedidoLogin.current?.abort(), []);

  function encerrarSessao(mensagem = '', tokenEncerrado = token) {
    if (localStorage.getItem('token') === tokenEncerrado) localStorage.removeItem('token');
    setToken(null);
    setErro(mensagem);
  }

  async function entrar(evento) {
    evento.preventDefault();
    const { email, senha } = Object.fromEntries(new FormData(evento.currentTarget));
    setErro('');
    setEntrando(true);
    const controle = new AbortController();
    pedidoLogin.current = controle;

    try {
      const resposta = await fetch(API + '/api/login', {
        method: 'POST',
        signal: controle.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });
      const dados = await lerResposta(resposta);
      if (typeof dados?.token !== 'string' || !dados.token) {
        throw new Error('a API não retornou um token');
      }

      if (controle.signal.aborted) return;
      localStorage.setItem('token', dados.token);
      setToken(dados.token);
    } catch (falha) {
      if (!controle.signal.aborted) setErro('Não deu para entrar: ' + falha.message);
    } finally {
      if (!controle.signal.aborted) setEntrando(false);
    }
  }

  return (
    <section className="container pagina-interna gestao">
      <div className="gestao-topo">
        <h1>Gestão</h1>
        {token && <button className="botao-secundario" type="button" onClick={() => encerrarSessao()}>Sair</button>}
      </div>
      {token ? (
        <PainelProjetos token={token} encerrarSessao={encerrarSessao} />
      ) : (
        <form className="gestao-form gestao-login" onSubmit={entrar}>
          <label className="campo">E-mail
            <input name="email" type="email" autoComplete="username" required />
          </label>
          <label className="campo">Senha
            <input name="senha" type="password" autoComplete="current-password" required />
          </label>
          <button type="submit" disabled={entrando}>Entrar</button>
          {erro && <p className="estado-pedido erro" role="alert">{erro}</p>}
        </form>
      )}
    </section>
  );
}

export default Gestao;
