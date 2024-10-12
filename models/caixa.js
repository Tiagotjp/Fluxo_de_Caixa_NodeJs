const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

// Definição do modelo "Caixa"
const Caixa = sequelize.define('Caixa', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tipo: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'caixas', // Opcional, nome da tabela no banco
  timestamps: false,   // Inclui as colunas createdAt e updatedAt automaticamente
});

module.exports = Caixa;
