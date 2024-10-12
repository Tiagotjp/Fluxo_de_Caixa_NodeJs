const sequelize = require('./config/database.js');
const Caixa = require('./models/caixa.js');

// Sincroniza o modelo com o banco de dados (cria a tabela se não existir)
sequelize.sync()
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar tabelas:', error);
  });
