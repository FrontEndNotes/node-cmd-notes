const fs = require('fs');
// Yargs parses command line arguments and generates help menu based on them
const yargs = require('yargs');
const notes = require('./notes.js');


const titleOptions = {
    describe: 'Title of note',
    demand: true, // is required,
    alias: 't'
};
const bodyOptions = {
    describe: 'Body of note',
    demand: true, // is required,
    alias: 'b'
};


// cmd options and help
const cmdArguments = yargs
    .command('list', 'List all notes')
    .command('read', 'Read note details', {
        title: titleOptions
    })
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv; // command line arguments


const command = cmdArguments._[0];

if(command === 'list'){
    const allNotes = notes.getAll();

    if(allNotes.length===0){
        console.log('No notes to display.')
        return;
    }

    console.log(`${allNotes.length} notes available:`)
    for(const note of allNotes){
        notes.logNote(note);
    }

} else if (command === 'read'){
    const note = notes.getNote(yargs.argv.title);

    if(note){
        console.log('Note details:');
        notes.logNote(note);
    }
    else
        console.log('Note not found.');

} else if (command === 'add'){
    var savedNote = notes.addNote(yargs.argv.title, yargs.argv.body);

    if(savedNote){
        console.log('Note added successfully.');
        notes.logNote(savedNote);
    }
    else
        console.log('The title already exists.')

} else if (command === 'remove'){
    const removed = notes.removeNote(yargs.argv.title);

    if(removed)
        console.log('Note removed successfully.');
    else
        console.log('Note not found.');
    
} else {
    console.log('Command not recognized');
}