const fs = require("fs");
const { v4: uuid } = require('uuid');

function getNotes(processDataFunction) {
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        processDataFunction(JSON.parse(data));
    });
}

function saveNote(note, callback) {
    getNotes(data => {
       note.id = uuid();
       data.push(note);
       fs.writeFile("db/db.json", JSON.stringify(data, null, 2), (err) => {
           if (err) throw err;
           callback(note);
        });
    });
}

function deleteNote(id, callback) {
    getNotes(data => {
        const newData = data.filter(e => e.id !== id);
        fs.writeFile("db/db.json", JSON.stringify(newData, null, 2), (err) => {
            if (err) throw err;
            callback();
         });
    });
}

module.exports = { getNotes, saveNote, deleteNote };
