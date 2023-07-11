const { Client } = require('pg');

// Configuração da conexão com o banco de dados
const armas = new Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "teste"
});

console.log("Iniciando conexão...");
    armas.connect();
    console.log("Conexão estabelecida com o banco de dados");

const getAllArmas = (req, res) => {
  armas.query('SELECT * FROM armas', (error, results) => {
    if (error) {
      res.status(500).send("Erro ao obter as armas");
    } else {
      const armasData = results.rows;
      if (armasData.length === 0) {
        res.status(404).send("Nenhum resultado encontrado.");
      } else {
        armasData.forEach(item => {
          const line = `ID: ${item.id}, Nome: ${item.nome}, Dano: ${item.dano}, Capacidade: ${item.capacidade}, Velocidade de Recarga: ${item.sreload}, Cadência: ${item.cadencia}, Precisão: ${item.precisao}, Valor: ${item.valor}, Tamanho: ${item.tamanho}` + '\n';
          res.write(line + "\n");
        });
        res.end();
      }
    }
  });
};

const getArmaById = (req, res) => {
  const getId = req.params.id;
  armas.query('SELECT * FROM armas WHERE id = $1', [getId], (error, results) => {
    if (error) {
      res.status(500).send("Erro ao obter a arma");
    } else {
      const arma = results.rows[0];
      if (!arma) {
        res.status(404).send("Nenhum resultado encontrado para o ID fornecido");
      } else {
        const line = `Nome: ${arma.nome}, Dano: ${arma.dano}, Capacidade: ${arma.capacidade}, Velocidade de Recarga: ${arma.sreload}, Cadência: ${arma.cadencia}, Precisão: ${arma.precisao}, Tamanho: ${arma.tamanho}, Valor: ${arma.valor}`;
        res.status(200).send(line);
      }
    }
  });
};

const createArma = (req, res) => {
  const { nome, dano, capacidade, sreload, cadencia, precisao, valor, tamanho } = req.body;

  if (!nome || !dano || !capacidade || !sreload || !cadencia || !precisao || !valor || !tamanho) {
    res.status(400).send("Os campos nome, dano, capacidade, velocidade de recarga, cadência, precisão, valor e tamanho são obrigatórios");
  } else {
    armas.query('INSERT INTO armas (nome, dano, capacidade, sreload, cadencia, precisao, valor, tamanho) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [nome, dano, capacidade, sreload, cadencia, precisao, valor, tamanho], (error) => {
      if (error) {
        res.status(500).send("Erro ao criar uma nova arma");
      } else {
        res.status(201).send("Arma adicionada com sucesso");
      }
    });
  }
};

const updateArma = (req, res) => {
  const getId = req.params.id;
  const { nome, dano, capacidade, sreload, cadencia, precisao, valor, tamanho } = req.body;

  if (!nome || !dano || !capacidade || !sreload || !cadencia || !precisao || !valor || !tamanho) {
    res.status(400).send("Os campos nome, dano, capacidade, velocidade de recarga, cadência, precisão, valor e tamanho são obrigatórios");
  } else {
    armas.query('UPDATE armas SET nome = $1, dano = $2, capacidade = $3, sreload = $4, cadencia = $5, precisao = $6, valor = $7, tamanho = $8 WHERE id = $9', [nome, dano, capacidade, sreload, cadencia, precisao, valor, tamanho, getId], (error, results) => {
      if (error) {
        res.status(500).send("Erro ao atualizar a arma");
      } else if (results.rowCount === 0) {
        res.status(404).send("Nenhum resultado encontrado para o ID fornecido");
      } else {
        res.status(200).send("Arma atualizada com sucesso");
      }
    });
  }
};

const deleteArma = (req, res) => {
  const getId = req.params.id;
  armas.query('DELETE FROM armas WHERE id = $1', [getId], (error, results) => {
    if (error) {
      res.status(500).send("Erro ao remover a arma");
    } else if (results.rowCount === 0) {
      res.status(404).send("Nenhum resultado encontrado para o ID fornecido");
    } else {
      res.status(200).send("Arma removida com sucesso");
    }
  });
};

module.exports = {
  getAllArmas,
  getArmaById,
  createArma,
  updateArma,
  deleteArma
};
