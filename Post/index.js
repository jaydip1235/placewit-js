const express = require("express");
const app = express();

const cors = require("cors");
const dotEnv = require("dotenv");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

/* `app.use(cors());` is enabling Cross-Origin Resource Sharing (CORS) for the Express app. CORS is a
security feature implemented by web browsers that restricts web pages from making requests to a
different domain than the one that served the web page. By enabling CORS, the Express app can
receive requests from different domains. */
app.use(cors());

/* `app.use(bodyParser.json({limit:"50mb"}));` is configuring the Express app to use the `body-parser`
middleware to parse incoming JSON data in the request body. The `{limit:"50mb"}` option sets the
maximum size of the JSON payload that can be parsed to 50 megabytes. This is useful when dealing
with large JSON payloads. */
app.use(bodyParser.json({ limit: "50mb" }));

/* `app.use(bodyParser.urlencoded({limit:"50mb",parameterLimit : 100000, extended : true}));` is
configuring the Express app to use the `body-parser` middleware to parse incoming URL-encoded data
in the request body. The `{limit:"50mb"}` option sets the maximum size of the URL-encoded payload
that can be parsed to 50 megabytes. The `parameterLimit : 100000` option sets the maximum number of
URL-encoded parameters that can be parsed to 100000. The `extended : true` option allows for parsing
of nested objects in the URL-encoded data. This middleware is useful when dealing with form data
submitted through HTML forms. */
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

dotEnv.config({ path: "./.env" });

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_DB_URL,{useNewUrlParser:true, useUnifiedTopology:true})
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use("/api",require("./routes/Crud"))

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
