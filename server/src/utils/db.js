const mongoose = require("mongoose");
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require("dotenv").config();

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb Connected successfully")
    } catch (error) {
        console.log("MongoDb connection failed", error)
    }
}

module.exports = ConnectDB;