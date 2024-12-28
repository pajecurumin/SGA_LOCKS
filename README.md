# SGA_LOCKS - Sistema de Gerenciamento de Armários e Loja Escolar

Sistema integrado para gerenciamento de armários escolares e loja virtual da ETEC. O sistema permite que alunos aluguem armários através de QR Codes e realizem compras de produtos fornecidos pela escola.

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

- Node.js
- Express.js
- Prisma (ORM)
- EJS (Template Engine)
- JWT (JSON Web Tokens)
- bcrypt (Criptografia)
- Express Session
- Nodemailer

## 📋 Pré-requisitos

Para executar este projeto, você precisará ter instalado:

- Node.js (versão 12 ou superior)
- NPM ou Yarn
- Um banco de dados compatível com Prisma

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Crie um arquivo `.env` na raiz do projeto
- Adicione as variáveis necessárias (veja o exemplo em `.env.example`)

4. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

## ⚙️ Executando

Para desenvolvimento:
```bash
npm run dev
```

Para produção:
```bash
npm start
```

O servidor estará disponível em `http://localhost:3000` (ou na porta definida nas variáveis de ambiente)

## 🛠️ Estrutura do Projeto

```
src/
├── public/         # Arquivos estáticos
├── routes/         # Rotas da aplicação
├── utils/          # Utilitários e helpers
├── views/          # Templates EJS
├── app.js         # Configuração do Express
└── server.js      # Entrada da aplicação

prisma/            # Configurações e migrações do Prisma
```

## 📜 Regras de Negócio

### Gestão APM
- Armários são propriedade e responsabilidade da Associação de Pais e Mestres (APM)
- APM define valores e períodos de locação
- Gestão financeira e manutenção sob responsabilidade da APM
- Relatórios financeiros e prestação de contas para a APM
- Configuração de políticas de uso e termos contratuais

### Sistema de Localização
- Identificação única por corredor e posição
- Formato de ID: [Corredor]-[Coluna]-[Posição]
  - Exemplo: A-01-03 (Corredor A, Coluna 1, Terceira posição de cima para baixo)
- Numeração sequencial de cima para baixo
- Sequência continua para o fundo do corredor
- Mapeamento visual da localização no sistema

### Sistema de QR Code
- QR Code contém o ID único do armário (Corredor-Coluna-Posição)
- Informações de localização física embutidas no QR Code
- Visualização da posição exata no mapa do sistema
- QR Codes são gerados e validados pelo sistema administrativo

### Processo de Reserva
- Aluno escaneia o QR Code do armário desejado
- Sistema verifica a disponibilidade em tempo real
- Bloqueio temporário do armário durante o processo de reserva
- Prazo limite para conclusão do processo de pagamento e contrato
- Liberação automática se o processo não for concluído no prazo

### Pagamento e Contrato
- Integração com sistema de pagamento
- Geração automática de contrato digital
- Assinatura digital do contrato pelo aluno
- Envio de cópia do contrato por email
- Comprovante de pagamento vinculado ao contrato

### Autenticação e Usuários
- Cada usuário deve ter um RM (Registro de Matrícula) único associado a uma ETEC específica
- O cadastro requer confirmação por email
- Campos obrigatórios: email, senha, nome, sobrenome, RM, ETEC e curso
- Verificação de vínculo ativo com a instituição
- Sistema de notificações via email

### Armários (Lockers)
- Identificação física e digital consistente com o padrão de localização
- Status em tempo real: disponível, reservado, em processo de pagamento, ocupado
- Período de locação semestral ou anual definido pela APM
- Sistema de renovação automática com prioridade para atual locatário
- Histórico de ocupação e manutenção por localização
- Registro fotográfico do estado do armário vinculado ao ID de localização

### Administração
- Dashboard com visualização por corredor e status
- Mapa interativo da disposição dos armários
- Gestão de pagamentos e repasse para APM
- Geração de relatórios financeiros para prestação de contas
- Monitoramento de inadimplência por localização
- Gestão de manutenção com identificação precisa do armário

### Restrições e Limites
- Um aluno só pode ter um armário ativo por vez
- Reserva temporária válida por 24 horas para conclusão do processo
- Necessário estar com matrícula ativa na ETEC
- Pagamento deve ser realizado antes da liberação do armário
- Contrato deve ser assinado digitalmente

## 📚 Modelo de Dados

### Visão Geral
O sistema utiliza um modelo de dados relacional com as seguintes características principais:
- Estrutura física totalmente configurável
- Gestão de usuários e permissões
- Sistema de aluguel e pagamentos
- Loja virtual integrada
- Gestão de manutenções

### Dicionário de Dados

#### School (Escola)
| Campo         | Tipo      | Descrição                                    |
|--------------|-----------|----------------------------------------------|
| id           | Int       | Identificador único da escola                |
| code         | String    | Código oficial da escola                     |
| name         | String    | Nome da escola                               |
| address      | String    | Endereço completo                           |
| city         | String    | Cidade                                      |
| state        | String    | Estado                                      |
| phone        | String    | Telefone de contato                         |
| email        | String    | Email oficial                               |
| principal    | String    | Nome do(a) diretor(a)                       |
| coordinator  | String    | Nome do(a) coordenador(a)                   |
| type         | String    | Tipo de escola (pública, privada, etc)      |
| active       | Boolean   | Status de ativação da escola                |
| createdAt    | DateTime  | Data de criação do registro                 |
| updatedAt    | DateTime  | Data da última atualização                  |

#### PhysicalStructure (Estrutura Física)
| Campo       | Tipo      | Descrição                                    |
|------------|-----------|----------------------------------------------|
| id         | Int       | Identificador único da estrutura             |
| schoolId   | Int       | ID da escola                                 |
| name       | String    | Nome da estrutura                            |
| type       | String    | Tipo (building, floor, corridor, section)    |
| parentId   | Int?      | ID da estrutura pai (opcional)               |
| description| String?   | Descrição da estrutura                       |
| order      | Int       | Ordem de exibição                            |
| active     | Boolean   | Status de ativação                           |

#### Locker (Armário)
| Campo           | Tipo      | Descrição                                    |
|----------------|-----------|----------------------------------------------|
| id             | Int       | Identificador único do armário               |
| locationId     | String    | ID de localização baseado no padrão da escola|
| structureId    | Int       | ID da estrutura física                       |
| position       | Int       | Posição dentro da estrutura                  |
| qrCode         | String    | Código QR único                              |
| status         | String    | Status (available, reserved, rented)         |
| condition      | String    | Condição física do armário                   |
| pricePeriod    | Float     | Preço por período                            |
| priceYear      | Float     | Preço anual                                  |
| lastMaintenance| DateTime? | Data da última manutenção                    |

#### User (Usuário/Aluno)
| Campo           | Tipo      | Descrição                                    |
|----------------|-----------|----------------------------------------------|
| id             | Int       | Identificador único do usuário               |
| studentId      | Int       | Número de matrícula                          |
| firstName      | String    | Nome                                         |
| lastName       | String    | Sobrenome                                    |
| email          | String    | Email do usuário                             |
| password       | String    | Senha (hash)                                 |
| course         | String    | Curso                                        |
| period         | Int       | Período atual                                |
| educationType  | String    | Tipo de ensino                               |
| active         | Boolean   | Status da conta                              |
| expiresAt      | DateTime  | Data de expiração da conta                   |

#### Rental (Aluguel)
| Campo       | Tipo      | Descrição                                    |
|------------|-----------|----------------------------------------------|
| id         | String    | Identificador único do aluguel               |
| lockerId   | Int       | ID do armário                                |
| userId     | Int       | ID do usuário                                |
| startDate  | DateTime  | Data de início                               |
| endDate    | DateTime  | Data de término                              |
| rentType   | String    | Tipo (period/year)                           |
| value      | Float     | Valor do aluguel                             |
| status     | String    | Status do aluguel                            |
| contractUrl| String    | URL do contrato                              |

#### Payment (Pagamento)
| Campo          | Tipo      | Descrição                                    |
|---------------|-----------|----------------------------------------------|
| id            | String    | Identificador único do pagamento             |
| rentalId      | String    | ID do aluguel                                |
| amount        | Float     | Valor do pagamento                           |
| method        | String    | Método (pix, credit_card, debit_card)        |
| status        | String    | Status do pagamento                          |
| paymentDetails| Json      | Detalhes específicos do pagamento            |
| transactionId | String?   | ID da transação no gateway                   |
| paidAt        | DateTime? | Data do pagamento                            |

#### Product (Produto)
| Campo       | Tipo      | Descrição                                    |
|------------|-----------|----------------------------------------------|
| id         | Int       | Identificador único do produto               |
| name       | String    | Nome do produto                              |
| description| String    | Descrição                                    |
| price      | Float     | Preço                                        |
| stock      | Int       | Quantidade em estoque                        |
| category   | String    | Categoria do produto                         |
| active     | Boolean   | Status de disponibilidade                    |
| imageUrl   | String?   | URL da imagem                                |

#### Maintenance (Manutenção)
| Campo        | Tipo      | Descrição                                    |
|-------------|-----------|----------------------------------------------|
| id          | Int       | Identificador único da manutenção            |
| lockerId    | Int       | ID do armário                                |
| type        | String    | Tipo (routine, repair, cleaning)             |
| description | String    | Descrição do serviço                         |
| status      | String    | Status da manutenção                         |
| scheduledFor| DateTime  | Data agendada                                |
| completedAt | DateTime? | Data de conclusão                            |

### Relacionamentos Principais

1. **Escola → Estrutura Física**
   - Uma escola pode ter múltiplas estruturas físicas
   - Cada estrutura pertence a uma única escola

2. **Estrutura Física → Armários**
   - Uma estrutura física pode conter múltiplos armários
   - Cada armário pertence a uma única estrutura

3. **Usuário → Aluguéis**
   - Um usuário pode ter múltiplos aluguéis
   - Cada aluguel pertence a um único usuário

4. **Armário → Aluguéis**
   - Um armário pode ter múltiplos aluguéis (histórico)
   - Cada aluguel está associado a um único armário

5. **Aluguel → Pagamento**
   - Um aluguel pode ter um pagamento
   - Cada pagamento está associado a um único aluguel

### Configurações Flexíveis

O sistema permite que cada escola configure:
1. **Estrutura Física**
   - Níveis hierárquicos (prédios, andares, corredores, etc.)
   - Capacidade por estrutura
   - Padrões de identificação

2. **Preços**
   - Templates de preços
   - Promoções com datas
   - Valores por período/ano

3. **Sistema**
   - Duração dos períodos
   - Métodos de pagamento
   - Emails para notificações

## 📄 Licença

Este projeto está sob a licença ISC - veja o arquivo [LICENSE](LICENSE) para detalhes.

## ✨ Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Adicione suas mudanças (`git add .`)
4. Comite suas mudanças (`git commit -m 'Add some AmazingFeature'`)
5. Faça o Push da Branch (`git push origin feature/AmazingFeature`)
6. Abra um Pull Request

## 🚀 Funcionalidades Principais

### Sistema de Armários
- Aluguel por QR Code
- Períodos de locação por módulo ou anual
- Pagamento via PIX, cartão de débito ou crédito
- Gestão automatizada de disponibilidade
- Exclusão automática de contas após conclusão do curso

### Loja Virtual ETEC
- Produtos fornecidos pela própria ETEC
- Integração com sistema de pagamento
- Controle de estoque
- Categorização de produtos

## 📜 Regras de Negócio

### Gestão de Usuários
- Conta vinculada ao módulo/ano do aluno
- Exclusão automática após conclusão (3º módulo ou 3º EM)
- Verificação de email obrigatória
- Perfil específico por ETEC

### Sistema de Armários
- Identificação única por QR Code e localização física
- Formato de ID: [Corredor]-[Coluna]-[Posição]
  - Exemplo: A-01-03 (Corredor A, Coluna 1, Terceira posição)
- Preços diferenciados para módulo e ano
- Liberação automática após término do período

### Pagamentos
- Métodos disponíveis:
  - PIX
  - Cartão de Débito
  - Cartão de Crédito
- Processamento automático
- Comprovantes digitais
- Histórico de transações

### Loja Virtual
- Produtos exclusivos da ETEC
- Gestão de estoque em tempo real
- Categorização de produtos
- Histórico de vendas

### Administração
- Gestão de armários por ETEC
- Postagem individual de armários
- Controle de produtos da loja
- Relatórios financeiros
- Monitoramento de contratos

## ⚙️ Processo de Aluguel

1. **Seleção do Armário**
   - Aluno escaneia QR Code do armário desejado
   - Sistema verifica disponibilidade
   - Exibe informações e preços

2. **Contratação**
   - Escolha do período (módulo ou ano)
   - Seleção da forma de pagamento
   - Processamento do pagamento
   - Geração do contrato digital

3. **Utilização**
   - Acesso imediato após confirmação do pagamento
   - Notificações de vencimento
   - Opção de renovação

4. **Encerramento**
   - Automático ao fim do período
   - Notificação prévia
   - Liberação para novos aluguéis
