const fs = require("fs");

function getNotes(processDataFunction) {
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        processDataFunction(JSON.parse(data));
    });
}

function saveNote(note, callback) {
    getNotes(data => {
       data.push(note);
       fs.writeFile("db/db.json", JSON.stringify(data), (err) => {
           if (err) throw err;
           callback(note);
        });
    });
}

function deleteNote(id) {
}

module.exports = { getNotes, saveNote, deleteNote };
