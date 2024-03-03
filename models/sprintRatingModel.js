const mongoose = require("mongoose");

SprintRatingSchema = new mongoose.Schema({

    employee_id:{
        type:String,
        required:true
    },
    sprint_id:{
        type:String,
        required:true
    },
    ratings:{
        type:Array,
    }

});

module.exports = SprintRatings = mongoose.model("SprintRating", SprintRatingSchema);