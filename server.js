const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sua_senha_aqui',
    database: 'tasklist'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

// ROTA PARA CRIAÇÃO DE TAREFAS
app.post('/tasks', (req, res) => {
    const { title, description, deadline, priority, responsible, project } = req.body;
    
    const sql = `INSERT INTO tasks (title, description, deadline, priority, responsible, project) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [title, description, deadline, priority, responsible, project], (err, result) => {
        if (err) {
            console.error('Erro ao inserir a tarefa:', err);
            res.status(500).send('Erro ao criar tarefa');
            return;
        }
        res.send({ success: true, message: 'Tarefa criada com sucesso!' });
    });
});

// ROTA PARA BUSCAR TAREFAS
app.get('/tasks', (req, res) => {
    const sql = 'SELECT *, DATE_FORMAT(deadline, "%Y-%m-%d") AS formatted_deadline FROM tasks';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar tarefas:', err);
            res.status(500).send('Erro ao buscar tarefas');
            return;
        }
        res.send(results.map(task => ({
            ...task,
            deadline: task.formatted_deadline
        })));
    });
});

// ROTA PARA EDIÇÃO DE TAREFAS
app.put('/tasks/:id', (req, res) => {
    const { title, description, deadline, priority, responsible, project, status } = req.body;
    const taskId = req.params.id;

    if (!taskId) {
        return res.status(400).send('ID da tarefa é obrigatório.');
    }

    const sql = `UPDATE tasks SET title = ?, description = ?, deadline = ?, priority = ?, responsible = ?, project = ?, status = ? WHERE id = ?`;
    db.query(sql, [title, description || '', deadline, priority, responsible, project, status, taskId], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar tarefa:', err);
            res.status(500).send('Erro ao editar tarefa');
            return;
        }
        res.send({ success: true, message: 'Tarefa editada com sucesso!' });
    });
});

// ROTA PARA DELETAR TAREFAS
app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;

    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.query(sql, [taskId], (err, result) => {
        if (err) {
            console.error('Erro ao deletar tarefa:', err);
            res.status(500).send('Erro ao deletar tarefa');
            return;
        }
        res.send({ success: true, message: 'Tarefa deletada com sucesso!' });
    });
});

// ROTA PARA ARQUIVO HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
