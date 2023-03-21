const { getAll, create, update, remove, getOne } = require('../controllers/actor.controllers');
const express = require('express');

const actorRouter = express.Router();

actorRouter.route('/')
    .get(getAll)
    .post(create)

actorRouter.route('/:id')
    .delete(remove)
    .put(update)
    .get(getOne)

module.exports = actorRouter;