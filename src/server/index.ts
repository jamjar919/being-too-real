import express from "express";
import * as dotenv from "dotenv";
import {Endpoints} from "../common/Endpoints";
import {setupLogs} from "./util/setupLogs";

dotenv.config();
setupLogs();

const app = express();
const port = process.env.PORT || 16000;

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/client"));

// App
app.get(Endpoints.BE_REAL, (_, res) => {
    res.send("test!");
});

app.listen(port, () => {
    console.log(`Active on port ${port}!`);
});
