function validarCliente() {
  const cliente = localStorage.getItem("cliente");
  if (!cliente) {
    window.location.href = `acessar.html`
  }
}

validarCliente();

function admin() {
  const clienteString = localStorage.getItem('cliente');
  const cliente = JSON.parse(clienteString);
  if (cliente.nome !== 'admin') {
    window.location.href = `usuario.html`
  }
  const nav = document.querySelector('nav');
  const adminLink = document.createElement('a');
  adminLink.href = 'cadastrarProduto.html';
  adminLink.innerText = 'Cadastrar Produtos';
  nav.appendChild(adminLink)
}

admin();

function onSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const valores = Object.fromEntries(data);
  fetch('http://localhost:3000/produtos', {
    method: 'POST',
    body: JSON.stringify(valores),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(() => {
    window.location.href = 'produtos.html'
  });
}

document.getElementById('cadastroForm').addEventListener('submit', onSubmit)
