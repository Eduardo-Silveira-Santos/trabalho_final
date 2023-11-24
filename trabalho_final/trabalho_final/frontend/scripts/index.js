function usuarioJaLogado() {
  const cliente = localStorage.getItem("cliente");

  if(cliente){
    window.location.href = `site.html`
  }
}

usuarioJaLogado();
