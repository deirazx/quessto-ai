const express = require("express");
const authRouter = express.Router();
const { googleAuth, logOut, getCurrectUser } = require("../controllers/auth.controller");
const { protect } = require("../middleware/protect.middleware");

authRouter.post("/google", googleAuth);
authRouter.get("/logout", logOut);
authRouter.get("/current-user", protect, getCurrectUser);

module.exports = authRouter;