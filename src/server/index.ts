import express from "express";
import * as dotenv from "dotenv";
import {Endpoints} from "../common/Endpoints";

dotenv.config();

const app = express();
const port = process.env.PORT || 16000;

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/client"));

// App
app.get(Endpoints.BE_REAL, (_, res) => {
    res.send("test!");
});

// API
app.listen(port, () => {
    console.log(`Active on port ${port}!`);
});
