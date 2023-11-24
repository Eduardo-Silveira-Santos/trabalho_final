// Importando o módulo DataTypes do pacote 'sequelize' para definir tipos de dados
const { DataTypes } = require('sequelize');

// Importando a instância do Sequelize configurada anteriormente
const { sequelize } = require("../sequelize");

// Definindo o modelo de dados 'ItemPedido' usando o Sequelize
const ItemPedido = sequelize.define('item_pedido', {
    codigo_pedido: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    sequencial: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    codigo_produto: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    total_item: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
}, {
    // Opções adicionais do modelo
    timestamps: false, // Desativa as colunas createdAt e updatedAt
    createdAt: false,
    updatedAt: false,
    freezeTableName: true, // Impede que o Sequelize pluralize o nome da tabela
    tableName: 'item_pedido', // Define o nome da tabela no banco de dados
    indexes: [
        {
            fields: ['codigo_pedido', 'sequencial'],
            unique: true,
        }
    ]
});

// Remove a coluna 'id' automaticamente gerada pelo Sequelize
ItemPedido.removeAttribute('id');

// Exportando o modelo 'ItemPedido' para ser utilizado em outros módulos
module.exports = {
    ItemPedido,
}
