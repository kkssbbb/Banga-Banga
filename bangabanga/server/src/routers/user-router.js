const express = require('express')
const router = express.Router();
const userService = require('../services/user-service');

const usersRouter = router

usersRouter.get('/', async(req, res, next)=>{
    try{
        const users = await userService.getUsers();
        res.status(200).json(users);
    }catch(error){
        next(error);
    }
});

module.exports = usersRouter;
