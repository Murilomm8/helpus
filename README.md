HelpUs 🛠️

HelpUs é um sistema simples e funcional de gerenciamento de chamados técnicos. Ele foi desenvolvido com o objetivo de facilitar o registro e o acompanhamento de problemas técnicos, permitindo que usuários comuniquem suas dificuldades e que administradores possam gerenciar esses chamados de forma eficiente.

O projeto utiliza tecnologias modernas e acessíveis, com um frontend leve em HTML, CSS e JavaScript, e um backend robusto em Node.js com banco de dados MySQL.

🚀 Tecnologias Utilizadas

Frontend: HTML, CSS (Bootstrap), JavaScript

Backend: Node.js + Express

Banco de Dados: MySQL

Bibliotecas: mysql2, cors

📦 Estrutura do Projeto

O projeto está organizado da seguinte forma:

helpus/
├── server.js              # Backend com rotas REST

├── helpus_db.sql          # Script opcional para criar a base de dados

├── public/

│   ├── admin.html         # Painel de administração

│   ├── admin.js           # Lógica do painel

│   ├── home.html          # Página inicial (opcional)

│   └── style.css          # Estilos personalizados (opcional)

🧑‍💻 Funcionalidades

Para Usuários

Registro de chamados com nome e descrição do problema

Para Administradores

Visualização de todos os chamados registrados

Marcação de chamados como resolvidos

Exclusão de chamados abertos

Interface visual com Bootstrap e ícones para facilitar a navegação

🛠️ Instalação e Execução

1. Clone o repositório
   
git clone https://github.com/seu-usuario/helpus.git

cd helpus

2. Instale as dependências
   
npm install express mysql2 cors

Configure o banco de dados MySQL

Crie o banco de dados helpus_db e a tabela chamados com o seguinte comando SQL:

sql

CREATE DATABASE helpus_db;

USE helpus_db;

CREATE TABLE chamados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  
  nome VARCHAR(100),
  
  problema TEXT,
  
  status VARCHAR(20) DEFAULT 'Aberto',
  
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  
);

3. Inicie o servidor
   
node server.js

O backend estará rodando em: http://localhost:3000

🌐 Acesso ao Painel
Para acessar o painel de administração, abra o arquivo admin.html diretamente no navegador ou utilize um servidor estático para servir a pasta public.

📈 Melhorias Futuras

Algumas ideias para evolução do projeto:

Autenticação de administradores com JWT

Modal para visualização detalhada dos chamados

Filtros por status, data ou prioridade

Exportação de chamados em CSV ou PDF

Dashboard com gráficos e estatísticas de atendimento

📄 Licença

Este projeto é livre para uso e modificação. Sinta-se à vontade para contribuir, adaptar ou utilizar como base para outros sistemas.
