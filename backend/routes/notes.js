const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser');
const Notes= require('../models/Notes');
// Route1: to get all notes. Get "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes',fetchuser, async(req, res) => {
    // Fetch notes from the database
    // and return them
    try {
        const notes =await Notes.find({ user: req.user.id });
        res.json(notes);
    }
    // Handle any errors that occur during the fetch
     catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
        
    //res.send([]);
});

// Route2: to add a new note. Post "/api/notes/addnote". Login required
router.post('/addnote', fetchuser,[
    body('title','Enter a valid title').isLength({ min: 3 }),
    body('description','Minimum description length is 5').isLength({ min: 5 }),
], async (req, res) => {
    // Validate the request body
    // and create a new note
    try {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Create a new note instance
    // and save it to the database
    const note = new Notes({
        title,description,tag,user: req.user.id,
    });
    const saveNote= await note.save()

    res.json(note);
} 
    // Handle any errors that occur during the creation
catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route3: to update an existing note. Put "/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
    // Create a note object with the updated values
    const newNote = {};
    if (title) { newNote.title = title; }
    if (description) { newNote.description = description; }
    if (tag) { newNote.tag = tag; }

    // Find the note by ID and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {    
        return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }
    // Update the note with the new values
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note });
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

// Route4: to delete an existing note. Delete "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //const { title, description, tag } = req.body;
        // Validate the request body
        // and delete the note
        
        // Find the note by ID and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) {    
            return res.status(404).send("Not Found");
        }
        // Check if the user is authorized to delete the note
        // If the note does not belong to the user, return an error
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        // Update the note with the new values
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");       
    }
    
})


// Route to add a new note
module.exports = router;