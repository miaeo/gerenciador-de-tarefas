# Gerenciador de Tarefas

Projeto de gerenciador de tarefas simples, com as funcionalidades de criar, visualizar, editar e deletar tarefas. Foi desenvolvido usando HTML, CSS e Javascript, com um back-end em Node.js e MySQL.

## Implementações

- **Criação de Tarefas:** adiciona novas tarefas ao sistema;
- **Visualização de Tarefas:** visualiza os detalhes de cada tarefa;
- **Edição de Tarefas:** possibilita a edição dos dados de uma tarefa existente;
- **Deleção de Tarefas:** remove tarefas do sistema;
- **Dark Mode:** adicionado suporte para modo escuro, permitindo uma experiência de usuário mais confortável;

> **Obs.:** O gráfico e os elementos visuais na página inicial são meramente decorativos e não estão integrados ao banco de dados.


## Instruções para execução local

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado
- [MySQL](https://www.mysql.com/) instalado
- [npm](https://www.npmjs.com/) instalado (se não vier com node.js automaticamente)

1. Clone o repositório:

   ```bash
   git clone https://github.com/miaeo/gerenciador-de-tarefas.git
   cd gerenciador-de-tarefas

2. Instale as dependências no terminal:
   ```bash
   npm install express mysql2 body-parser cors

4. Crie um banco de dados MySQL:
   ```sql
   CREATE DATABASE tasklist;
   USE tasklist;
   
   CREATE TABLE tasks (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       description TEXT,
       deadline DATE,
       priority VARCHAR(50),
       responsible VARCHAR(100),
       project VARCHAR(100),
       status VARCHAR(50) DEFAULT 'To do'
   );

5. Configure suas credenciais do banco de dados no arquivo server.js;

6. Inicie o servidor com:
   ```bash
   node server.js

A aplicação pode ser acessada em http://localhost:3000 após iniciar o servidor.
