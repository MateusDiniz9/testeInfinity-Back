Projeto Teste Infinity - Back-End

Este é o back-end do Projeto Teste Infinity, desenvolvido utilizando Node.js, TypeScript, Prisma como ORM e PostgreSQL como banco de dados. O projeto inclui uma API RESTful que gerencia tarefas e usuários.

Tecnologias Utilizadas

Node.js
TypeScript
Prisma (ORM)
PostgreSQL (Banco de Dados)
Express (Framework HTTP)
Docker (para gerenciamento de containers)
ESLint e Prettier (para padronização de código)

Instalação e Configuração

Pré-requisitos
Node.js instalado (v14.x ou superior)
Docker e Docker Compose instalados (opcional, mas recomendado)
PostgreSQL instalado (se não estiver usando Docker)

Clonar o Repositório
git clone https://github.com/seu-usuario/testeInfinity-Back.git
cd testeInfinity-Back

Instalar Dependências
npm install

Configuração do Banco de Dados
Crie um arquivo .env na raiz do projeto e adicione as variáveis de ambiente, incluindo as credenciais do banco de dados. Veja a seção Variáveis de Ambiente abaixo para mais detalhes.
Configure o Prisma para se conectar ao banco de dados:
npx prisma migrate dev --name init
Isso criará as tabelas no banco de dados com base no esquema do Prisma.

Executando o Banco de Dados com Docker
Se você preferir usar Docker para rodar o banco de dados, execute o comando abaixo para iniciar o PostgreSQL em um container:
docker-compose up -d

Executando o Projeto
Em Desenvolvimento
Para rodar o projeto em modo de desenvolvimento, utilize:
npm run dev
O servidor será iniciado em http://localhost:4000

Rodando as Migrações
Para aplicar as migrações do banco de dados, execute:
npx prisma migrate dev

Rodando com Docker
Se quiser rodar o back-end dentro de um container Docker, basta executar:
docker-compose up --build

Rotas da API
Usuários
POST /users: Cria um novo usuário
POST /users/sign-in: Cria uma nova sessão

Tarefas
GET /tasks: Lista todas as tarefas de um usuário pelo id
POST /tasks: Cria uma nova tarefa para um usuário
PUT /tasks/: Atualiza uma tarefa pelo id
DELETE /tasks/: Remove uma tarefa pelo id

Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
PORT=4000
DATABASE_URL: URL de conexão ao banco de dados PostgreSQL.
PORT: Porta em que o servidor será executado.

Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais informações.
