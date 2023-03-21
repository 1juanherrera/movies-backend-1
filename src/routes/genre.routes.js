const { getAll, remove, create, update, getOne } = require('../controllers/genre.controllers');
const express = require('express');

const genreRouter = express.Router();

genreRouter.route('/')
    .get(getAll)
    .post(create)

genreRouter.route('/:id')
    .delete(remove)
    .put(update)
    .get(getOne)

module.exports = genreRouter;