const CorredorService = require('../services/corredorService');

class CorredorController {
  // Criar corredor
  async createCorredor(req, res) {
    const { corredorNumero, salaNumero, lockerNumero } = req.body;

    // Validação dos dados recebidos
    if (!corredorNumero || !salaNumero || !lockerNumero) {
      return res.status(400).json({ error: 'Todos os campos (corredorNumero, salaNumero, lockerNumero) são obrigatórios.' });
    }

    try {
      const corredor = await CorredorService.createCorredor(corredorNumero, salaNumero, lockerNumero);
      res.status(201).json(corredor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Listar todos os corredores
  async getAllCorredores(req, res) {
    try {
      const corredores = await CorredorService.getAllCorredores();
      res.status(200).json(corredores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Buscar corredor por ID
  async getCorredorById(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'ID do corredor é obrigatório.' });
    }

    try {
      const corredor = await CorredorService.getCorredorById(Number(id));
      if (!corredor) {
        return res.status(404).json({ error: 'Corredor não encontrado' });
      }
      res.status(200).json(corredor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Atualizar corredor
  async updateCorredor(req, res) {
    const { id } = req.params;
    const data = req.body;

    if (!id) {
      return res.status(400).json({ error: 'ID do corredor é obrigatório.' });
    }

    try {
      const updatedCorredor = await CorredorService.updateCorredor(Number(id), data);
      res.status(200).json(updatedCorredor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Deletar corredor
  async deleteCorredor(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'ID do corredor é obrigatório.' });
    }

    try {
      await CorredorService.deleteCorredor(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CorredorController();