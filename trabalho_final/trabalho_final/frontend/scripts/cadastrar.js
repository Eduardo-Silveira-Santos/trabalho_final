function onSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const valores = Object.fromEntries(data);
  fetch('http://localhost:3000/clientes', {
    method: 'POST',
    body: JSON.stringify(valores),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(() => {
    window.location.href = 'index.html'
  });
}

function usuarioJaLogado() {
  const cliente = localStorage.getItem("cliente");
  if (cliente) {
    window.location.href = `home.html`
  }
}

usuarioJaLogado();

document.getElementById('cadastroForm').addEventListener('submit', onSubmit)
