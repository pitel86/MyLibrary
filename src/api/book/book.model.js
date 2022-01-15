const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { validationPassword } = require('../../utils/validators/validation')
const { setError } = require('../../utils/errors/error')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    name: { type: 'String', trim: true, required: true },
    description: { type: 'String', required: true },
    author:  { type: 'String', trim: true },
    category:  [{ type: Schema.Types.ObjectId, trim: true, ref: "category"}] ,
    year: { type: 'Number', trim: true},
    img: { type: 'String', trim: true },
    pdf: { type: 'String', trim: true }
}, { timestamps: true })

const Book = mongoose.model('book', bookSchema)
module.exports = Book