const express = require("express");
const path = require("path");

const dao = require("./dao");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.get("/api/notes", (req, res, next) => dao.getNotes((notes) => res.json(notes), next));
app.post("/api/notes", (req, res, next) => dao.saveNote(req.body, (note) => res.json(note), next));
app.delete("/api/notes/:id", (req, res, next) => dao.deleteNote(req.params.id, () => res.end(), next));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

app.listen(PORT, () => console.log("App listening on PORT: " + PORT));
