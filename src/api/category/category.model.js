const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { validationPassword } = require('../../utils/validators/validation')
const { setError } = require('../../utils/errors/error')

const categorySchema = new mongoose.Schema({
    name: { type: 'String', trim: true, required: true },
    description: { type: 'String', trim: true}
}, { timestamps: true })

const Category = mongoose.model('category', categorySchema)
module.exports = Category