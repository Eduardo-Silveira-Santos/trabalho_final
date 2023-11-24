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
    if (cliente.nome === 'admin') {
        const nav = document.querySelector('nav');
        const adminLink = document.createElement('a');
        adminLink.href = 'cadastrarProduto.html';
        adminLink.innerText = 'Cadastrar Produtos';
        nav.appendChild(adminLink)
    }
}

admin();

function adicionarPedidoTabela(pedido) {
    const linha = document.createElement("tr");
    const tdCodigoPedido = document.createElement("td");
    const tdCodigoCliente = document.createElement("td");
    const tdTotal = document.createElement("td");
    tdCodigoPedido.innerText = pedido.codigo_pedido;
    tdCodigoCliente.innerText = pedido.codigo_cliente;
    tdTotal.innerText = `$${pedido.total}`;
    linha.appendChild(tdCodigoPedido);
    linha.appendChild(tdCodigoCliente);
    linha.appendChild(tdTotal);
    document.querySelector('tbody').appendChild(linha);
}

function preencherTabelaPedidos() {
    fetch(`http://localhost:3000/pedidos`, {
        method: 'get',
    }).then((response) => {
        response.json().then((pedidos) => {
            pedidos.forEach((pedido) => {
                adicionarPedidoTabela(pedido);
            });
        });
    });
}

preencherTabelaPedidos();
