const mongoose = require("mongoose")
mongoose.set('strictQuery', true)
require("dotenv").config()


const connection = mongoose.connect("mongodb+srv://ajay123:12345@cluster0.nw4btm1.mongodb.net/test")

module.exports = connection