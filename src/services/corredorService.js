const prisma = require('../config/database');

class CorredorService {
  // Método para criar um corredor, sala e armário
  async createCorredor(corredorNumero, salaNumero, lockerNumero) {
    try {
      // Verificar se o número do armário já existe
      const existingLocker = await prisma.locker.findUnique({
        where: { numero: lockerNumero }, // Alterado de 'armario' para 'locker'
      });

      if (existingLocker) {
        throw new Error('Número do armário já existe.');
      }

      // Criar o corredor, sala e armário
      const corredor = await prisma.corredor.create({
        data: {
          numero: corredorNumero, // Permitido repetição
          salas: {
            create: {
              numero: salaNumero, // Permitido repetição
              armarios: {
                create: {
                  numero: lockerNumero, // Número único para o armário
                },
              },
            },
          },
        },
      });
      return corredor;
    } catch (error) {
      throw new Error('Erro ao criar corredor, sala ou armário: ' + error.message);
    }
  }

  // Método para buscar todos os corredores
  async getAllCorredores() {
    try {
      return await prisma.corredor.findMany({
        include: {
          salas: {
            include: {
              armarios: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error('Erro ao buscar corredores: ' + error.message);
    }
  }

  // Método para buscar um corredor específico pelo ID
  async getCorredorById(id) {
    try {
      return await prisma.corredor.findUnique({
        where: { id },
        include: {
          salas: {
            include: {
              armarios: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error('Erro ao buscar corredor: ' + error.message);
    }
  }

  // Método para atualizar um corredor
  async updateCorredor(corredorNumero, salaNumero, lockerNumero) {
    try {
      // Verificar se o corredor e a sala existem
      const corredor = await prisma.corredor.findUnique({
        where: { numero: corredorNumero },
        include: { salas: { where: { numero: salaNumero }, include: { armarios: { where: { numero: lockerNumero } } } } }
      });
  
      if (!corredor || !corredor.salas || !corredor.salas[0] || !corredor.salas[0].armarios || !corredor.salas[0].armarios[0]) {
        throw new Error('Corredor, sala ou armário não encontrados');
      }
  
      // Atualizar o armário existente
      const upcorredor = await prisma.corredor.update({
        where: { numero: corredor.numero },
        data: {
          salas: {
            update: {
              where: { numero: salaNumero },
              data: {
                armarios: {
                  update: {
                    where: { numero: lockerNumero },
                    data: {} // Se precisar atualizar outros dados, adicione-os aqui
                  }
                }
              }
            }
          }
        }
      });
  
      
      
      return upcorredor;
  
    } catch (error) {
      throw new Error('Erro ao atualizar corredor, sala ou armário: ' + error.message);
    }
  

}

  // Método para deletar um corredor
  async deleteCorredor(id) {
    try {
      // Verificar se o corredor existe e remover dependências
      const corredor = await prisma.corredor.findUnique({
        where: { id },
        include: { salas: { include: { armarios: true } } }
      });
  
      if (!corredor) {
        throw new Error('Corredor não encontrado');
      }
  
      // Remover armários associados
      for (const sala of corredor.salas) {
        for (const armario of sala.armarios) {
          await prisma.armario.delete({ where: { id: armario.id } });
        }
        // Após remover os armários, remover a sala
        await prisma.sala.delete({ where: { id: sala.id } });
      }
  
      // Remover o corredor após a remoção de salas e armários
      const deletarCorredor = await prisma.corredor.delete({
        where: { id }
      });
  
      return deletarCorredor;
  
    } catch (error) {
      throw new Error('Erro ao deletar corredor: ' + error.message);
    }
  }


-}
module.exports = new CorredorService();
