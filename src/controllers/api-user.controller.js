const {Router} = require('express');
const User = require('../dataBase/models/User.model');
const Token = require('../dataBase/models/Token.model');
const {asyncHandler, requireToken} = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
    router.get('/about', asyncHandler(requireToken), asyncHandler(getInfo));
    router.patch('/update', asyncHandler(requireToken), asyncHandler(updateInfo));
    router.post('/logout', asyncHandler(requireToken), asyncHandler(logout));
}

async function getInfo(req, res, _next) {
    let user = await User.findByPk(req.userId);
    res.status(200).json(user);
}

async function updateInfo(req, res, _next) {
    let user = await User.update(req.body, {
        where: {
            id: req.userId,
        },
        returning: true, // первое-количество затронутых строк, второе самая затронутая строка
    });

    res.status(200).json(user);
}

async function logout(req, res, _next) {
    await Token.destroy({
        where: {
            value: req.header("x-access-token"),
        },
    });

    res.status(200).json({message: "Logged out"});
}

initRoutes();

module.exports = router;