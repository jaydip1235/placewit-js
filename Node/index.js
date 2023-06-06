const express = require('express');
const app = express();

const cors = require('cors');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');


/* `app.use(cors());` is enabling Cross-Origin Resource Sharing (CORS) for the Express app. CORS is a
security feature implemented by web browsers that restricts web pages from making requests to a
different domain than the one that served the web page. By enabling CORS, the Express app can
receive requests from different domains. */
app.use(cors());



/* `app.use(bodyParser.json({limit:"50mb"}));` is configuring the Express app to use the `body-parser`
middleware to parse incoming JSON data in the request body. The `{limit:"50mb"}` option sets the
maximum size of the JSON payload that can be parsed to 50 megabytes. This is useful when dealing
with large JSON payloads. */
app.use(bodyParser.json({limit:"50mb"}));




/* `app.use(bodyParser.urlencoded({limit:"50mb",parameterLimit : 100000, extended : true}));` is
configuring the Express app to use the `body-parser` middleware to parse incoming URL-encoded data
in the request body. The `{limit:"50mb"}` option sets the maximum size of the URL-encoded payload
that can be parsed to 50 megabytes. The `parameterLimit : 100000` option sets the maximum number of
URL-encoded parameters that can be parsed to 100000. The `extended : true` option allows for parsing
of nested objects in the URL-encoded data. This middleware is useful when dealing with form data
submitted through HTML forms. */
app.use(bodyParser.urlencoded({limit:"50mb",parameterLimit : 100000, extended : true}));


dotEnv.config({path:"./.env"})

const port = process.env.PORT || 5000;


app.get("/hello", (req, res) => {
    res.send("Server response");
})

app.post("/hello2", (req, res) => {
    let {num1,num2} = req.body;
    num1+=1;
    num2+=2;
    res.send({num1: num1, num2: num2});

})

app.post("/hello2/:name/:email",(req, res) => {
    let myname = req.params.name;
    let myemail = req.params.email;
    res.send({myname: myname, myemail: myemail});
})

app.get("/",(req, res) => {
    res.send("Hii");
})


app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
})



