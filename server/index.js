const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const ConnectDB = require("./src/utils/db")

app.get("/", (req, res) => {
    res.send("<h3>Hello users how are you ?</h3>")
})

ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
