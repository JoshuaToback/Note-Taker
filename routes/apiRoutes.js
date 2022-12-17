const allNotes = require('../db/db.json');
const fs = require('fs');
const router = require('express').Router();
const path = require('path');


router.get('/notes', (req, res) => {
    res.json(allNotes);
});


function createNewNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray)){notesArray = [];}

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
}

router.post('/notes', (req, res) => {
    const newNote = createNewNote(req.body, allNotes);
    res.json(newNote);
});

function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, '../db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );
            
            break;
        }
    }
}

router.delete('/notes/:id', (req, res) => {
    deleteNote(req.params.id, allNotes);
    res.json(true);
});

module.exports = router;