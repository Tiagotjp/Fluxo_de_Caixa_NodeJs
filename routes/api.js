const express = require('express');
const router = express.Router();
const Caixa = require('../models/caixa');
const { Op } = require('sequelize');

/* GET home page. */
router.get('/caixas', async function(req, res, next) {
  try {
    // Obter o parâmetro "tipo" da query string, se presente
    const tipo = req.query.tipo;

    // Criar um objeto para conter as opções de filtro
    const filtro = {};

    // Se o parâmetro "tipo" estiver presente na query string, adicionar ao filtro
    if (tipo) {
      filtro.tipo = {
        [Op.like]: `%${tipo}%`
      };
    }

    // Aqui você pode utilizar o modelo "Caixa" para obter os dados do banco de dados com base nas opções de filtro
    const extrato = await Caixa.findAll({
      where: filtro
    });

    // Inicializa as variáveis de receitas e despesas
    let receitas = 0;
    let despesas = 0;

    // Itera pelos lançamentos e calcula as receitas e despesas
    for (const lancamento of extrato) {
      if (lancamento.status === 1) {
        receitas += lancamento.valor;
      } else if (lancamento.status === 0) {
        despesas += lancamento.valor;
      }
    }

    // Calcula o valor total
    const valor_total = receitas - despesas;

    res.send({ 
      valor_total: valor_total,
      receitas: receitas,
      despesas: despesas,
      extrato: extrato
    });

  } catch (error) {
    res.send(error).status(500);
  }
});

router.delete('/caixas/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    // Encontre o lançamento a ser excluído pelo ID
    const lancamento = await Caixa.findByPk(id);

    if (!lancamento) {
      // Se o lançamento não for encontrado, redirecionar para a página inicial
      return res.send({ mensagem: "Não existe este registro" }).status(404);
    }

    // Excluir o lançamento do banco de dados
    await lancamento.destroy();

    return res.send({}).status(204);
  } catch (error) {
    next(error);
  }
});

router.post('/caixas', async function(req, res, next) {
  try {
    // Obter os dados do formulário
    const { tipo, valor, status } = req.body;

    // Inserir os dados no banco de dados usando o modelo "Caixa"
    const caixa = await Caixa.create({ tipo, valor, status });

    res.send(caixa).status(201);
  } catch (error) {
    next(error);
  }
});

module.exports = router;