const {Router} = require('express');
const ErrorResponse = require('../classes/error-response');
const ToDo = require('../dataBase/models/ToDo.model.');
const {asyncHandler, requireToken} = require('../middlewares/middlewares');

const router = Router();

function initRoutes() {
    router.post('/', asyncHandler(requireToken), asyncHandler(createToDo));
    router.get('/', asyncHandler(requireToken), asyncHandler(getToDos));
    router.get('/:id', asyncHandler(requireToken), asyncHandler(getToDoById));
    router.patch('/:id', asyncHandler(requireToken), asyncHandler(updateToDoById));
    router.delete('/', asyncHandler(requireToken), asyncHandler(deleteToDos));
    router.delete('/:id', asyncHandler(requireToken), asyncHandler(deleteToDoById));
}

async function createToDo(req, res, _next) {
    const todo = await ToDo.create({
        ...req.body,
        userId: req.userId,
    });

    res.status(200).json({todo});
}

async function getToDos(req, res, _next) {
    const todos = await ToDo.findAll({
        where: {
            userId: req.userId,
        },
    });

    res.status(200).json({todos});
}

async function getToDoById(req, res, _next) {
    const todo = await ToDo.findByPk({
        where: {
            id: req.params.id,
            userId: req.userId,
        },
    });

    if (!todo) {
        throw new ErrorResponse("No todo found", 404);
    }

    res.status(200).json(todo);
}

async function updateToDoById(req, res, _next) {
    const todo = await ToDo.update(req.body, {
            where: {
                id: req.params.id,
                userId: req.userId,
            },
            returning: true,
        },
    )
    res.status(200).json(todo);
}

async function deleteToDos(req, res, _next) {
    await ToDo.destroy({
            where: {
                userId: req.userId
            },
        },
    )
    res.status(200).json({
        message: "All ToDos were deleted"
    });
}

async function deleteToDoById(req, res, _next) {
    let id = req.params.id;
    let todo = await ToDo.findByPk({
        where: {
            id: id,
            userId: req.userId,
        }
    });
    await todo.destroy();
    res.status(200).json({
        message: "Todo with id ( " + id + " ) was deleted"
    });
}

initRoutes();

module.exports = router;