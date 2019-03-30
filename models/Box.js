var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BoxSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    boxBelongsTo: {
        type: String,
    },
    contents: {
        type: Object,
    },
    uniqueID: {
        type: Number,
    }

});

var Box = mongoose.model("Boxes", BoxSchema);

// Export the Note model
module.exports = Box;