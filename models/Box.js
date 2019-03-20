var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BoxSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    box: {
        type: Schema.Types.ObjectId,
        ref: "Box"
    }

});

var Box = mongoose.model("Box", BoxSchema);

// Export the Note model
module.exports = Box;