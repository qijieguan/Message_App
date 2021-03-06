const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const textSchema = new Schema({
    friends: {
        type: Array,
        required: true,
        trim: true,
        minlength: 2
    },
    text: [{
        user_id: { type: String, trim: true },
        content: { type: String, trim: true }
    }]
},
{
    timestamps: true,   
});

const Text = mongoose.model('Text', textSchema);
module.exports = Text;