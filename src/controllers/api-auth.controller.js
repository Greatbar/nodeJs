const {Router} = require('express');
const ErrorResponse = require('../classes/error-response');
const User = require('../dataBase/models/User.model');
const Token = require("../dataBase/models/Token.model");
const {asyncHandler} = require('../middlewares/middlewares');
const {Op} = require("sequelize");
const {nanoid} = require("nanoid");

const router = Router();

function initRoutes() {
    router.post('/registration', asyncHandler(registration));
    router.post('/login', asyncHandler(login));
}

async function registration(req, res, _next) {
    // Переписать метод неправильно условие оп ор
    const user = await User.findOne({
        where: {
            login: req.body.login,
            //// SELECT * FROM WHERE login = req.body.login OR password = req.body.password;
        },
    });
    if (user) {
        throw new ErrorResponse("Login or password is already exist", 400);
    }
    let user_create = await User.create(req.body);
    res.status(200).json(user_create);
}

async function login(req, res, _next) {
    let user = await User.findOne({
        where: {
            login: req.body.login,
            password: req.body.password,
        }
    })
    if (!user) {
        throw new ErrorResponse('Wrong login or password', 400);
    }
    const token = await Token.create({
        userId: user.id,
        value: nanoid(128),
    })

    res.status(200).json({
        accessToken: token.value,
    })
}

initRoutes();

module.exports = router;