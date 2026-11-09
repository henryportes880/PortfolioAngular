// SVG local: o ícone não depende dos símbolos disponíveis na fonte do sistema.
function Seta({ direcao = 'diagonal' }) {
  return (
    <svg className={`seta seta--${direcao}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export default Seta;
