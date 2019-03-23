var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BoxSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    collectionBoxBelongsTo: {
        type: String,
    },
    id: {
        type: Number,
    },
    contents: {
        type: Object,
    }

});

var Box = mongoose.model("Boxes", BoxSchema);

// Export the Note model
module.exports = Box;