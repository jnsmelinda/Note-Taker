// Series of npm packages that we will use to give our service useful functionality
const express = require("express");
const path = require("path");
const dao = require("./dao");

// Sets up the Express App
const app = express();

// Sets an initial port
const PORT = process.env.PORT || 3000;

// Sets up the Express features
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// Displays all notes
app.get("/api/notes", (req, res, next) => dao.getNotes((notes) => res.json(notes), next));

// Saves a note
app.post("/api/notes", (req, res, next) => dao.saveNote(req.body, (note) => res.json(note), next));

// Deletes a note by id
app.delete("/api/notes/:id", (req, res, next) => dao.deleteNote(req.params.id, () => res.end(), next));

// Below code handles when users "visit" a page
// In each of the below cases the user is shown an HTML page of content
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

// The below code confirms the "start" of our server
app.listen(PORT, () => console.log("App listening on PORT: " + PORT));
