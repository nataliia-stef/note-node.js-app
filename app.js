const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');


const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: ['t', 'tit']
}

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove the note', {
        title: titleOptions
    })
    .help()
    .argv;

let command = argv._[0];

if(command === 'add'){
    let note = notes.addNote(argv.title, argv.body);
    if(note){
        notes.logNote(note);
    } else {console.log("You already have this note!");}

} else if (command === 'list'){
    notes.getAll(); 
} else if (command === 'read'){
    let note = notes.getNote(argv.title);
    if(note){
        notes.logNote(note);
    }else {console.log("There is no notes with such a title!")}
    
} else if (command === 'remove'){
    let noteDeleted = notes.removeNote(argv.title);
    let message = noteDeleted ? `A note with the title ${argv.title} was removed` : "Note not found!";
    console.log(message);
} else {
    console.log('Command not recognized');
}
