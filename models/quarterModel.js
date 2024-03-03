const mongoose = require("mongoose");

QuarterSchema = new mongoose.Schema({
    quarter_name:{
        type:String,
        required:true
    },
    start_date:{
        type:Date,
        required:true
    },
    end_date:{
        type:Date,
        required:true
    }
});


module.exports = Quarters = mongoose.model("Sprint", QuarterSchema);