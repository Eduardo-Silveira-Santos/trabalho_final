const { sequelize } = require("./sequelize");
const { Cliente } = require("./modulos/cliente");
const { Login } = require("./modulos/login");
const { Produtos } = require("./modulos/produtos");
const { Pedidos } = require("./modulos/pedidos");
const { ItemPedido } = require("./modulos/ItemPedido");

// Função para autenticar a conexão com o banco de dados
async function authenticate() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Função para selecionar todos os clientes do banco de dados
async function selectAllClientes() {
    const clientes = await Cliente.findAll();
    return clientes;
}

// Função para selecionar um cliente específico do banco de dados com base no ID
async function selectCliente(id) {
    const cliente = await Cliente.findOne({
        where: {
            codigo_cliente: id
        }
    });
    return cliente;
}

// Função para inserir um novo cliente no banco de dados
async function insertClientes(data) {
    const cliente = await Cliente.create({
        nome: data.nome,
        rua: data.rua,
        numero: data.numero,
        complemento: data.complemento,
        bairro: data.bairro,
        cidade: data.cidade,
        uf: data.uf,
        cep: data.cep,
    });

    await Login.create({
        usuario: data.usuario,
        senha: data.senha,
        codigo_cliente: cliente.codigo_cliente
    })
}

// Função para atualizar os detalhes de um cliente no banco de dados
async function updateClientes(id, novoCliente) {
    const cliente = await Cliente.findOne({
        where: {
            codigo_cliente: id,
        }
    });

    await cliente.update(
        {
            nome: novoCliente.nome,
            rua: novoCliente.rua,
            numero: novoCliente.numero,
            complemento: novoCliente.complemento,
            bairro: novoCliente.bairro,
            cidade: novoCliente.cidade,
            uf: novoCliente.uf,
            cep: novoCliente.cep,
        }
    );

    await cliente.save();

    if (novoCliente.senha) {
        await Login.update(
            {
                senha: novoCliente.senha
            },
            {
                where: {
                    codigo_cliente: id
                }
            }
        )
    }

    return cliente;
}

// Função para excluir um cliente do banco de dados com base no ID
async function deleteClientes(id) {
    await User.destroy({
        where: {
            id: id
        }
    });
}

// Função para realizar login, retornando os detalhes do cliente associado
async function login(usuario, senha) {
    const login = await Login.findOne({
        where: {
            usuario: usuario,
            senha: senha,
        }
    });

    const cliente = await Cliente.findOne({
        where: {
            codigo_cliente: login.codigo_cliente
        }
    });

    return cliente;
}

// Função para inserir um novo produto no banco de dados
async function insertProduto(data) {
    await Produtos.create({
        descricao: data.descricao,
        preco: data.preco,
        imagem: data.imagem,
    });
}

// Função para selecionar todos os produtos do banco de dados
async function selectAllProdutos() {
    const produtos = await Produtos.findAll();

    return produtos;
}

// Função para selecionar os dois produtos mais recentes como destaque
async function selectDestaque() {
    const produtos = await Produtos.findAll({
        limit: 2,
        order: [
            ['codigo_produto', 'DESC'],
        ]
    });

    return produtos;
}

// Função para inserir um novo pedido e seus itens associados no banco de dados
async function insertPedido(id, itensPedido) {
    const total = itensPedido.reduce((acc, item) => {
        return acc += item.total_item;
    }, 0);

    const pedido = await Pedidos.create({
        codigo_cliente: id,
        total: total,
    });

    for (const item of itensPedido) {
        await ItemPedido.create({
            codigo_pedido: pedido.codigo_pedido,
            sequencial: item.sequencial,
            codigo_produto: item.codigo_produto,
            quantidade: item.quantidade,
            total_item: item.total_item,
        });
    }

    return pedido;
}

// Exporta todas as funções para serem utilizadas em outros módulos
module.exports = {
    authenticate,
    selectAllClientes,
    selectCliente,
    insertClientes,
    updateClientes,
    deleteClientes,
    login,
    insertProduto,
    selectAllProdutos,
    selectDestaque,
    insertPedido,
}