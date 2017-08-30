
// -- IMPORTS --
const fs = require('fs');


// -- HELPERS --
const fetchNotes = () => {

    // file may not exist
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (error) {
        return [];
    }
}


const saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}


const logNote = (note) => {
    console.log(`------------
title: ${note.title}
body:  ${note.body}
    `);
}

// -- CODE --
const getAll = () => {

    return fetchNotes();

}


const getNote = (title) => {

    var notes = fetchNotes();
    var singleNote = notes.filter( note => note.title === title);
    
    if(singleNote)
        return singleNote[0];
}



// node app.js --title="Note title"  --body="Note body"
const addNote = (title, body) => {
    var notes = fetchNotes();
    var noteToSave = {
        title, 
        body
    };

    var duplicateNotes = notes.filter( note => note.title === title);

    if(duplicateNotes.length === 0){
        notes.push(noteToSave);
        saveNotes(notes);

        return noteToSave;
    }
}



// node app.js --title="Note title"  --body="Note body"
const removeNote = (title) => {

    var notes = fetchNotes();
    var updatedNotes = notes.filter( note => note.title !== title);
    saveNotes(updatedNotes);

    return notes.length !== updatedNotes.length;
}


module.exports = {
    getAll, 
    getNote,
    addNote,
    removeNote,
    logNote
}