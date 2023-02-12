const path = require('path');

const router = require('express').Router();

//Sends notes to the notes.html page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

//Reroutes user to the homepage if an issue pops up.
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = router;