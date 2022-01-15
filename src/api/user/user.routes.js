const UserRoutes = require('express').Router();
const { isAuth } = require('../../utils/middleware/auth')
const { postNewUser, loginUser, logOut, getUser, addOwnedBook, addDesiredBook } = require('./user.controller')

UserRoutes.post('/', postNewUser)
UserRoutes.post('/login', loginUser)
UserRoutes.post('/logout',[isAuth], logOut)
UserRoutes.get('/:id', [isAuth], getUser)
UserRoutes.patch('/addOwnedBook/:id',[isAuth], addOwnedBook)
UserRoutes.patch('/addDesiredBook/:id',[isAuth], addDesiredBook)

module.exports = UserRoutes;