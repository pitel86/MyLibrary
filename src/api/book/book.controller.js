const Book = require('./book.model');
const { deleteFile } = require('../../utils/middleware/deleteFile')
const { setError } = require('../../utils/errors/error');

const postNewBook = async (req, res, next) => {
    try {
        const newBook = new Book(req.body)
        if (req.file) {
            newBook.img = req.file.path
        }
        const bookDB  = await newBook.save()
        return res.status(201).json(bookDB)
    } catch (error) {
        return next(setError(500, 'Book not save'))        
    }
}

const getAllBooks = async (req,res,next) => {
try {
    const bookDB = await Book.find().populate('category')
    res.status(200).json(bookDB)
} catch (error) {
    console.log(error)
    return next(setError(500, 'Books server errors'))
}
}

const getBook = async (req,res,next) => {
    try {
        const { id } = req.params;
        const bookDB = await Book.findById(id).populate('category')
        if (!bookDB){
            return next(setError(404, 'Book not found'))
        }
        return res.status(200).json(bookDB)
    } catch (error) {
        return next(setError(500, 'Book fail'))
    }
}

const deleteBook = async (req,res,next) => {
    try {
        const { id } = req.params;
        const bookDB = await Book.findByIdAndDelete(id)
        if (!bookDB){
            return next(setError(404, 'Book not found'))
        }
        if (bookDB.img) {
            deleteFile(bookDB.img)
        }
        return res.status(200).json(bookDB)
    } catch (error) {
        return next(setError(500, 'Book fail'))
    }
}

const patchBook = async (req,res,next) => {
    try {
        const { id } = req.params;
        const patchBook = new Book(req.body);
        patchBook._id = id
        if (req.file) {
            patchBook.img = req.file.path
        }
        const bookDB = await Book.findByIdAndUpdate(id, patchBook);
        if (!bookDB){
            return next(setError(404, 'Book not found'))
        }
        if (bookDB.img) {
            deleteFile(bookDB.img)
        }
        return res.status(200).json({new: patchBook, old: bookDB})
    } catch (error) {
        return next(setError(500, 'Book fail'))
        
    }
}

module.exports = {
    postNewBook,
    getBook,
    deleteBook,
    patchBook,
    getAllBooks
}