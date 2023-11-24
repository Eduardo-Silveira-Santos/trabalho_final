// Importando o módulo DataTypes do pacote 'sequelize' para definir tipos de dados
const { DataTypes } = require('sequelize');

// Importando a instância do Sequelize configurada anteriormente
const { sequelize } = require("../sequelize");

// Definindo o modelo de dados 'Cliente' usando o Sequelize
const Cliente = sequelize.define('cliente', {
    // Atributos do modelo são definidos aqui
    codigo_cliente: {
        type: DataTypes.NUMBER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rua: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numero: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    complemento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    uf: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    // Opções adicionais do modelo
    timestamps: false, // Desativa as colunas createdAt e updatedAt
    createdAt: false,
    updatedAt: false,
    freezeTableName: true, // Impede que o Sequelize pluralize o nome da tabela
    tableName: 'cliente' // Define o nome da tabela no banco de dados
});

// Exportando o modelo 'Cliente' para ser utilizado em outros módulos
module.exports = {
    Cliente,
}
