var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", (req, res) => {res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", (req, res) => {res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => { console.log("App listening on PORT: " + PORT);
});
