const mongoose = require("mongoose");

QuarterRatingSchema = new mongoose.Schema({

    employee_id:{
        type:String,
        required:true
    },
    quarter_id:{
        type:String,
        required:true
    },
    ratings:{
        type:Array,
    }

});

module.exports = QuarterRatings = mongoose.model("SprintRating", QuarterRatingSchema);