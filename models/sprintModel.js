const mongoose = require("mongoose");

SprintSchema = new mongoose.Schema({
    start_date:{
        type:Date,
        required:true
    },
    end_date:{
        type:Date,
        required:true
    }
});


module.exports = Sprints = mongoose.model("Sprint", SprintSchema);