// Importando o módulo DataTypes do pacote 'sequelize' para definir tipos de dados
const { DataTypes } = require('sequelize');

// Importando a instância do Sequelize configurada anteriormente
const { sequelize } = require("../sequelize");

// Definindo o modelo de dados 'Pedidos' usando o Sequelize
const Pedidos = sequelize.define('pedidos', {
    codigo_pedido: {
        type: DataTypes.NUMBER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    codigo_cliente: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    total: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
}, {
    // Opções adicionais do modelo
    timestamps: false, // Desativa as colunas createdAt e updatedAt
    createdAt: false,
    updatedAt: false,
    freezeTableName: true, // Impede que o Sequelize pluralize o nome da tabela
    tableName: 'pedidos', // Define o nome da tabela no banco de dados
});

// Exportando o modelo 'Pedidos' para ser utilizado em outros módulos
module.exports = {
    Pedidos,
}
