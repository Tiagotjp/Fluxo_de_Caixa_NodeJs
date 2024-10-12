const { Sequelize } = require('sequelize');

// Configuração para o MySQL (pode ser adaptado para outros bancos de dados)
const sequelize = new Sequelize(
  (process.env.DATABASE || 'fluxo_de_caixa_nodejs'),
  (process.env.DATABASE_USER || 'root'),
  (process.env.DATABASE_PASS || ''),

  {
  host: (process.env.DATABASE_HOST || 'localhost'),
  dialect: 'mysql', // ou 'postgres', 'sqlite', etc.
});

module.exports = sequelize;
