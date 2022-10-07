const Sequelize = require('sequelize');
const connection = require('./database'); //importando código de conexão com o banco

let resposta = connection.define('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

resposta.sync({ force: false });
module.exports = resposta;