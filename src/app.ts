import express from "express";
import cors from "cors";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import routes from "./route";

const app = express();
app.use(cors());
app.enable("trust proxy");

app.use(express.json());
//Body parser, reading data from body to req.body
app.use(express.urlencoded({ extended: true }));

const swaggerDocument = YAML.load("./openapi/compiled.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", routes);

app.get("/", (req, res) => {
    res.status(200).send("Welcome to max drive test");
});

//entry point for api calls
export default app;
