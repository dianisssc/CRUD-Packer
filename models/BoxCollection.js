var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const bcrypt = require("bcryptjs");
let SALT_WORK_FACTOR = 10

var BoxCollectionSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true,
    },
    box: {
        type: Schema.Types.ObjectId,
        ref: "Boxes"
    },
    password: {
        type: String,
        required: true
    }

});

BoxCollectionSchema.pre("save", function (next) {
    let box = this;
    if (box.isModified("password") || box.isNew) {
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                box.password = hash;
                next();
            });
        });
    } else {
        return next();
    }

});

var BoxColl = mongoose.model("BoxColl", BoxCollectionSchema);

// Export the Note model
module.exports = BoxColl;