const CategoryRoutes = require('express').Router()
const { isAuth } = require('../../utils/middleware/auth')
const { postNewCategory, getCategory, deleteCategory, patchCategory, getAllCategory } = require('./category.controller')

CategoryRoutes.post('/',[isAuth], postNewCategory)
CategoryRoutes.get('/:id', getCategory)
CategoryRoutes.get('/', getAllCategory)
CategoryRoutes.delete('/:id',[isAuth], deleteCategory)
CategoryRoutes.patch('/:id',[isAuth], patchCategory)
module.exports = CategoryRoutess