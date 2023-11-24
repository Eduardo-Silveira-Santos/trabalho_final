// Importando o módulo Sequelize do pacote 'sequelize'
const { Sequelize } = require('sequelize');

// Configurando e inicializando uma instância do Sequelize
const sequelize = new Sequelize('abuble', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
});

// Exportando a instância do Sequelize para ser utilizada em outros módulos
module.exports = {
    sequelize,
}