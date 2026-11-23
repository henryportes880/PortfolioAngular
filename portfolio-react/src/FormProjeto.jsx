import { useState } from 'react';

function FormProjeto({ projeto, bloqueado, cancelar, salvar }) {
  const [anoInicial] = useState(() => projeto?.ano ?? new Date().getFullYear());

  async function enviar(evento) {
    evento.preventDefault();
    const formulario = evento.currentTarget;
    const dados = Object.fromEntries(new FormData(formulario));
    dados.nome = dados.nome.trim();
    dados.ano = Number(dados.ano);
    if (await salvar(dados)) formulario.reset();
  }

  return (
    <form onSubmit={enviar}>
      <h2>{projeto ? 'Editar projeto' : 'Novo projeto'}</h2>
      <fieldset disabled={bloqueado}>
        <label className="campo">Nome
          <input name="nome" defaultValue={projeto?.nome} required pattern=".*\S.*" maxLength={150} />
        </label>
        <label className="campo">Descrição
          <textarea name="descricao" defaultValue={projeto?.descricao ?? ''} rows={4} maxLength={16383} />
        </label>
        <label className="campo">Tecnologias
          <input name="tecnologias" defaultValue={projeto?.tecnologias ?? ''} maxLength={255} />
        </label>
        <label className="campo">Ano
          <input name="ano" type="number" defaultValue={anoInicial} step="1" min={-2147483648} max={2147483647} required />
        </label>
        <label className="campo">Link do GitHub
          <input name="link_github" type="url" pattern="https?://.+" defaultValue={projeto?.link_github ?? ''} maxLength={255} />
        </label>
        <div className="gestao-acoes">
          <button type="submit">Salvar</button>
          {projeto && <button type="button" onClick={cancelar}>Cancelar</button>}
        </div>
      </fieldset>
    </form>
  );
}

export default FormProjeto;
