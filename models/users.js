const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const findOrCreate=require('mongoose-find-or-create');

const userSchema = new Schema({
    googleId:{
        type: String,
        unique: true
    },
    name: String,
    surname: String,
    profilePhotoUrl: String
});

userSchema.plugin(findOrCreate); //plugin'i shema üzerinde kullanabilir olmak
module.exports = mongoose.model('users',userSchema);