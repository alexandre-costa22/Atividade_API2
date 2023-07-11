const express = require('express');
const armasController = require('../controllers/armaController');


const router = express.Router();

// Rota para obter todas as armas
router.get('/all', armasController.getAllArmas);

// Rota para obter uma arma pelo ID
router.get('/:id', armasController.getArmaById);

// Rota para criar uma nova arma
router.post('/', armasController.createArma);

// Rota para atualizar uma arma pelo ID
router.put('/:id', armasController.updateArma);

// Rota para excluir uma arma pelo ID
router.delete('/:id', armasController.deleteArma);

module.exports = router;
