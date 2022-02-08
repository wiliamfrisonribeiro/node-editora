const express = require('express')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const getEditoras = (request, response) => {
    pool.query('SELECT * FROM editoras', (error, results) => {
        if (error) {
            return response.status(401).json({
                status: 'error',
                message: 'Erro ao recuperar as editoras: ' + error
            });
        }
        response.status(200).json(results.rows)
    })
}

const addEditora = (request, response) => {
    const { nome, site } = request.body

    pool.query(
        'INSERT INTO editoras (nome, site) VALUES ($1, $2)',
        [nome, site],
        (error) => {
            if (error) {
                return response.status(401).json({
                    status: 'error',
                    message: 'Erro ao inserir as editoras: ' + error
                });
            }
            response.status(201).json({ status: 'success', message: 'Editora criada.' })
        },
    )
}

const updateEditora = (request, response) => {
    const { codigo, nome, site } = request.body
    pool.query('UPDATE editoras set nome=$1, site=$2 where codigo=$3',
        [nome, site, codigo], error => {
            if (error) {
                return response.status(401).json({
                    status: 'error',
                    message: 'Erro ao atualizar as editoras: ' + error
                });
            }
            response.status(201).json({ status: 'success', message: 'Editora atualizada.' })
        })
}

const deleteEditora = (request, response, next) => {
    const codigo = parseInt(request.params.id)
    pool.query(
        'DELETE from editoras where codigo=$1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({
                    status: 'error',
                    message: 'Não foi possivel remover a editora'
                });
            }
            response.status(201).json({
                status: 'success',
                message: 'Editora removida com sucesso'
            })
        },
    )
}

const getEditoraPorID = (request, response) => {
    const codigo = parseInt(request.params.id)
    pool.query('SELECT * FROM editoras where codigo = $1',
        [codigo], (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({
                    status: 'error',
                    message: 'Não foi possivel recuperar a editora'
                });
            }
            response.status(200).json(results.rows)
        })
}


const getLivros = (request, response) => {
    pool.query('SELECT * FROM livros', (error, results) => {
        if (error) {
            return response.status(401).json({
                status: 'error',
                message: 'Erro ao recuperar as livros: ' + error
            });
        }
        response.status(200).json(results.rows)
    })
}
const addLivro = (request, response) => {
    const { nome, autor, data_lancamento, editora } = request.body

    pool.query(
        'INSERT INTO livros (nome, autor, data_lancamento, editora  ) VALUES ($1, $2, $3, $4)',
        [nome, autor, data_lancamento, editora],
        (error) => {
            if (error) {
                return response.status(401).json({
                    status: 'error',
                    message: 'Erro ao inserir o Livro: ' + error
                });
            }
            response.status(201).json({ status: 'success', message: 'Livro criada.' })
        },
    )
}
const updateLivro = (request, response) => {
    const { codigo, nome, autor, data_lancamento, editora } = request.body
    pool.query('UPDATE livros set nome=$1, autor=$2, data_lancamento=$3, editora=$4 where codigo=$5',
        [nome, autor, data_lancamento, editora, codigo], error => {
            if (error) {
                return response.status(401).json({
                    status: 'error',
                    message: 'Erro ao atualizar o livro: ' + error
                });
            }
            response.status(201).json({ status: 'success', message: 'Livro atualizada.' })
        })
}

const deleteLivro = (request, response, next) => {
    const codigo = parseInt(request.params.id)
    pool.query(
        'DELETE from livros where codigo=$1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({
                    status: 'error',
                    message: 'Não foi possivel remover o livro'
                });
            }
            response.status(201).json({
                status: 'success',
                message: 'Editora removida com sucesso'
            })
        },
    )
}

const getLivroPorID = (request, response) => {
    const codigo = parseInt(request.params.id)
    pool.query('SELECT * FROM livros where codigo = $1',
        [codigo], (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({
                    status: 'error',
                    message: 'Não foi possivel recuperar o livro'
                });
            }
            response.status(200).json(results.rows)
        })
}

app
    .route('/editoras')
    .get(getEditoras)
    .post(addEditora)
    .put(updateEditora)

app.route('/editoras/:id')
    .get(getEditoraPorID)
    .delete(deleteEditora)

    app
    .route('/livros')
    .get(getLivros)
    .post(addLivro)
    .put(updateLivro)

    app.route('/livros/:id')
    .get(getLivroPorID)
    .delete(deleteLivro)

app.listen(process.env.PORT || 3002, () => {
    console.log(`Servidor rodando`)
})