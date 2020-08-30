// Series of npm packages that we will use to give our server useful functionality
const fs = require("fs");
const {v4: uuid} = require("uuid");

const fileName = "db/db.json";

// Retrives all the notes
function getNotes(callback, next) {
    fs.readFile(fileName, "utf8", (err, data) => {
        if (err) next(err);
        else callback(JSON.parse(data));
    });
}

// Saves a note
function saveNote(note, callback, next) {
    getNotes(
        (data) => {
            note.id = uuid();
            data.push(note);
            fs.writeFile(fileName, JSON.stringify(data, null, 2), (err) => {
                if (err) next(err);
                else callback(note);
            });
        },
        next
    );
}

// Deletes a note by its unique id
function deleteNote(id, callback, next) {
    getNotes(
        (data) => {
            const newData = data.filter((e) => e.id !== id);
            fs.writeFile(fileName, JSON.stringify(newData, null, 2), (err) => {
                if (err) next(err);
                else callback();
            });
        },
        next
    );
}

module.exports = {getNotes, saveNote, deleteNote};
