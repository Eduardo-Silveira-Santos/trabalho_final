function usuarioJaLogado() {
  const cliente = localStorage.getItem("cliente");
  if (cliente) {
    window.location.href = `home.html`
  }
}

usuarioJaLogado();
