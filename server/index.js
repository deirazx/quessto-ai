const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const ConnectDB = require("./src/utils/db")
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5174/auth",
    credentials: true
}))

app.get("/", (req, res) => {
    res.send("<h3>Hello users how are you ?</h3>")
})

app.use('/api/auth', require("./src/routes/auth.route"))

ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
