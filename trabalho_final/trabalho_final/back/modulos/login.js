// Importando o módulo DataTypes do pacote 'sequelize' para definir tipos de dados
const { DataTypes } = require('sequelize');

// Importando a instância do Sequelize configurada anteriormente
const { sequelize } = require("../sequelize");

// Definindo o modelo de dados 'Login' usando o Sequelize
const Login = sequelize.define('login', {
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    codigo_cliente: {
        type: DataTypes.NUMBER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
}, {
    // Opções adicionais do modelo
    timestamps: false, // Desativa as colunas createdAt e updatedAt
    createdAt: false,
    updatedAt: false,
    freezeTableName: true, // Impede que o Sequelize pluralize o nome da tabela
    tableName: 'login', // Define o nome da tabela no banco de dados
});

// Exportando o modelo 'Login' para ser utilizado em outros módulos
module.exports = {
    Login,
}
