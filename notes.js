const fs = require('fs');

let fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('notes-data.json');
        //read all the notes and save it in array if there any
        notes = JSON.parse(notesString);
    } catch (e){
        return [];
    }

    return notes;
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

let addNote = (title, body) =>{
    let notes = fetchNotes();
    let note = {
        title,
        body
    };
    //we don't want notes with duplicate value
    //filter will return new value to array if there is the same title - will not pass
    let duplicateNotes = notes.filter((note) => note.title === title);
    
    if(duplicateNotes.length === 0){
        //add new note
        notes.push(note);
        saveNotes(notes);
        return note;
    }   
};

let getAll = () => {
    let allNotes = fetchNotes();
    console.log(`You have ${allNotes.length} note(s):`)
    allNotes.forEach((note)=> logNote(note)); 
};

let getNote = (title) => {
    let notes = fetchNotes(title);
    let readNotes = notes.filter((note) => note.title === title);
    return readNotes[0];
};

let removeNote = (title) => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter((note) =>  note.title !== title);
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
}

let logNote = (note) => {
    console.log (`Your note! 
                ------
                Title: ${note.title}
                Body: ${note.body}`);
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
}