var express = require("express");
var path = require("path");

const dao = require("./dao");
const { request } = require("http");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", (req, res) => dao.getNotes(notes => res.json(notes)));
app.post("/api/notes", (req, res) => dao.saveNote(req.body, note => res.json(note)));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

app.listen(PORT, () => console.log("App listening on PORT: " + PORT));
