// Importando o módulo DataTypes do pacote 'sequelize' para definir tipos de dados
const { DataTypes } = require('sequelize');

// Importando a instância do Sequelize configurada anteriormente
const { sequelize } = require("../sequelize");

// Definindo o modelo de dados 'Produtos' usando o Sequelize
const Produtos = sequelize.define('produtos', {
    codigo_produto: {
        type: DataTypes.NUMBER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    // Opções adicionais do modelo
    timestamps: false, // Desativa as colunas createdAt e updatedAt
    createdAt: false,
    updatedAt: false,
    freezeTableName: true, // Impede que o Sequelize pluralize o nome da tabela
    tableName: 'produtos', // Define o nome da tabela no banco de dados
});

// Exportando o modelo 'Produtos' para ser utilizado em outros módulos
module.exports = {
    Produtos,
}
