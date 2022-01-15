const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { validationPassword } = require('../../utils/validators/validation')
const { setError } = require('../../utils/errors/error')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: 'String', trim: true, required: true },
    email: { type: 'String', trim: true, required: true, unique: true },
    password: { type: 'String', trim: true, required: true },
    ownedBooks: [{ type: Schema.Types.ObjectId, ref: "book"}],
    desiredBooks: [{ type: Schema.Types.ObjectId, ref: "book"}]
}, { timestamps: true })

userSchema.pre("save", function (next) {
    if (!validationPassword(this.password)) {
        return next(setError(400, 'La contraseña no tiene los minimos requeridos'))
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model('users', userSchema)
module.exports = User