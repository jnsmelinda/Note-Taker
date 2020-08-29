const fs = require("fs");

const getNotes = (callback) => {
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        callback(data);
    });
};

const saveNote = (note) => {
};

const deleteNote = (id) => {
};

module.exports = {getNotes, saveNote, deleteNote};
