const BookRoutes = require('express').Router()
const { isAuth } = require('../../utils/middleware/auth')
const { postNewBook, getBook, deleteBook, patchBook, getAllBooks } = require('./book.controller')
const upload = require('../../utils/middleware/file')

BookRoutes.post('/',[isAuth], upload.single('img'), postNewBook)
BookRoutes.get('/:id', getBook)
BookRoutes.get('/', getAllBooks)
BookRoutes.delete('/:id',[isAuth], deleteBook)
BookRoutes.patch('/:id',[isAuth], upload.single('img'), patchBook)

module.exports = BookRoutes;