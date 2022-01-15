const Category = require('./category.model');
const { setError } = require('../../utils/errors/error');

const postNewCategory = async (req, res, next) => {
    try {
        const newCategory = new Category(req.body)
        const categoryDB  = await newCategory.save()
        return res.status(201).json(categoryDB)
    } catch (error) {
        return next(setError(500, 'Category not save'))        
    }
}
const getAllCategory = async (req,res,next) => {
    try {
        const categoryDB = await Category.find()
        res.status(200).json(categoryDB)
    } catch (error) {
        console.log(error)
        return next(setError(500, 'Categorys server errors'))
    }
    }

const getCategory = async (req,res,next) => {
    try {
        const { id } = req.params;
        const categoryDB = await Category.findById(id)
        if (!categoryDB){
            return next(setError(404, 'Category not found'))
        }
        return res.status(200).json(categoryDB)
    } catch (error) {
        return next(setError(500, 'Category fail'))
    }
}

const deleteCategory = async (req,res,next) => {
    try {
        const { id } = req.params;
        const categoryDB = await Category.findByIdAndDelete(id)
        if (!categoryDB){
            return next(setError(404, 'Category not found'))
        }
        return res.status(200).json(categoryDB)
    } catch (error) {
        return next(setError(500, 'Category fail'))
    }
}

const patchCategory = async (req,res,next) => {
    try {
        const { id } = req.params;
        const patchCategory = new Category(req.body);
        patchCategory._id = id
        const categoryDB = await Category.findByIdAndUpdate(id, patchCategory);
        if (!categoryDB){
            return next(setError(404, 'Category not found'))
        }
        return res.status(200).json({new: patchCategory, old: categoryDB})
    } catch (error) {
        return next(setError(500, 'Category fail'))
        
    }
}

module.exports = {
    postNewCategory,
    getCategory,
    getAllCategory,
    deleteCategory,
    patchCategory
}