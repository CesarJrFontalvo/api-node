const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');
const auth = require('../auth');



const router = express.Router();

// Routes
router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure('update'), upsert);
router.delete('/:id', remove);

// Internal functions
function list(req, res, next) {
    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch(next);
}

function get(req, res, next) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
}

function upsert(req, res, next) {
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
}


function remove(req, res, next) {
    Controller.remove(req.params.id)
        .then((user) => {
            response.success(req, res, user,  200);
            //res.status(200).send({msg: 'El usuario se ha eliminado de la base de datos !!'})
        })
        .catch(next);
}
module.exports = router;