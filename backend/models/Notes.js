const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for Notes
const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default: "general"
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

// Create the Notes model from the schema  
module.exports = mongoose.model('notes', NotesSchema);