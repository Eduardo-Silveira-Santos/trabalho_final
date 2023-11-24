// Configuração do ambiente usando o pacote dotenv e importação do módulo db
require("dotenv").config();
const db = require("./db");

// Configuração inicial do Express
const express = require("express");
const cors = require('cors');
const app = express();

// Middleware para permitir solicitações CORS e para processar JSON
app.use(cors())
app.use(express.json());

// Inicialização do servidor Express e autenticação com o banco de dados
app.listen(process.env.PORT, () =>{
    console.log("App está executando");
    db.authenticate();
});

// Rota de teste para verificar se o servidor está vivo
app.get("/", (request, response, next) => {
    response.json({
        message: "Estou vivo!"
    })
})

// Rotas para manipulação de clientes
app.delete("/clientes/:id", async (request, response) => {
    const id = parseInt(request.params.id);

    try {
        await db.deleteClientes(id);
        response.sendStatus(204);
    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
})

app.post("/clientes", async (request,response) => {
    const cliente = request.body;

    try {
        await db.insertClientes(cliente);
        response.sendStatus(201);
    } catch (error) {
        console.log(error)
        response.sendStatus(500);
    }
})

app.patch("/clientes/:id", async (request,response) => {
    const id = parseInt(request.params.id);
    const cliente = request.body;

    try {
        const clienteUpdate = await db.updateClientes(id, cliente);
        response.json(clienteUpdate);
    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
})

app.get("/clientes", async (request, response) => {
    try {
        const results = await db.selectAllClientes();
        response.json(results);
    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
})

app.get("/clientes/:id", async (request, response) => {
    const id = parseInt(request.params.id);

    try {
        const results = await db.selectCliente(id);
        response.json(results);
    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
})

// Rota para autenticação/login
app.get("/login/:usuario/:senha", async (request, response) => {
    try {
        const usuario = request.params.usuario;
        const senha = request.params.senha;

        if(usuario !== 'admin'){
            const results = await db.login(usuario, senha);
            response.json(results);
        } else {
            if(senha === 'admin') {
                response.json({
                    nome: 'admin',
                });
            }
        }
    
        response.sendStatus(400);
    } catch (error) {
        console.log(error)
        response.sendStatus(500);
    }
})

// Rotas para manipulação de produtos
app.post("/produtos", async (request,response) => {
    const produto = request.body;

    try {
        await db.insertProduto(produto);
        response.sendStatus(201);
    } catch (error) {
        console.log(error)
        response.sendStatus(500);
    }
})

app.get("/produtos", async (request, response) => {
    try {
        const produtos = await db.selectAllProdutos();
        response.json(produtos);
    } catch (error) {
        console.log(error)
        response.sendStatus(500);
    }
})

app.get("/produtos/destaque", async (request, response) => {
    try {
        const produtos = await db.selectDestaque();
        response.json(produtos);
    } catch (error) {
        console.log(error)
        response.sendStatus(500);
    }
})

// Rota para finalizar uma compra
app.post("/finalizar-compra/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const itensPedido = request.body;

    try {
        const pedido = await db.insertPedido(id, itensPedido);
        response.json(pedido);
    } catch (error) {
        console.log(error)
        response.sendStatus(500);
    }
})
