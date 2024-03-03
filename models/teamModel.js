const mongoose = require("mongoose");

TeamSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    }
});


module.exports = Teams = mongoose.model("Team", TeamSchema);