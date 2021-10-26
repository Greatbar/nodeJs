const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:115569@localhost:5432/sevadb') // Example for postgres
const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

sequelize.sync().then(() => {
    app.listen(3000, function () {
        console.log("Сервер ожидает подключения...");
    });
}).catch(error => console.log(error));

const ToDo = sequelize.define('ToDo', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
}, {});


app.get('/todo', (req, res) => {
    ToDo.findAll().then(todos => {
        const response = todos.map(todo => ({
            title: todo.title,
            description: todo.description,
            id: todo.id
        }))
        res.status(200).json({
            response
        })
    }).catch(error => {
        res.status(500).json({error})
    });
});

app.get('/todo/:id', (req, res) => {
    const id = req.params.id;
    ToDo.findOne(
        {
            where: {id: id}
        }).then(todo => {
        const response = {
            title: todo.title,
            description: todo.description,
            id: todo.id
        }
        res.status(200).json({
            response
        })
    }).catch(error => {
        res.status(500).json({error})
    });
});

app.post('/todo', (req, res) => {
    ToDo.create(req.body).then(todo => {
        if (!req.body.title) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        const response = {
            title: todo.title,
            description: todo.description,
            id: todo.id
        }
        res.status(200).json({
            response
        })
    }).error(error => {
        res.status(500).json({error})
    });
});

app.put('/todo/:id', (req, res) => {
    ToDo.update(req.body, {
        where: {id: req.params.id}
    }).then((todo) => {
        ToDo.findOne(
            {
                where: {id: todo}
            }).then(todo => {
            const response = {
                title: todo.title,
                description: todo.description,
                id: todo.id
            }
            res.status(200).json({
                response
            })
        }).catch(error => {
            res.status(500).json({error})

        });
    });
})

app.delete('/todo/:id', (req, res) => {
    ToDo.destroy({
        where: {id: req.params.id}
    }).then(() => {
        res.status(204).json({})
    }).catch(error => {
        res.status(500).json({error})
    });
})


app.post('/test', (req, res) => {
    console.log(req.body);
    res.status(200).json({message: req.body})
    //console.log(req.body);
});