// index.js
import express from "express";
import bodyParser from "body-parser";
import customerRoutes from "./routes/customerRoutes.js";

const app = express();

app.use(bodyParser.json());

// Use the customerRoutes
app.use("/api/", customerRoutes);

const port = 3000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
