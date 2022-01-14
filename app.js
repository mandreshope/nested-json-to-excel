"use strict";

// Import dependencies and set up http server
const
  { urlencoded } = require("body-parser"),
  cors = require('cors'),
  path = require("path"),
  fs = require("fs"),
  { jsonToExcel } = require("nested-json-to-table"),
  { v4: uuidv4 } = require("uuid"),
  bodyParser = require('body-parser');


const express = require('express')
const app = express()
const port = 3000
const appUrl = "http://localhost";

// Serving static files in Express
app.use(express.static(__dirname + '/public'));

app.use(cors())

app.use(
  urlencoded({
    extended: true,
  })
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.status(200).send("ok");
});

app.post("/export", (req, res) => {
  let body = req.body;

  console.log(body)

  if (Object.keys(body).length === 0 ) {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  } else {
    let name = body.name;
    let obj = body.data;
    let props = body.props;

    // let props = [
    //   { key: "id" },
    //   {
    //     key: "person",
    //     props: [
    //       { key: "id" },
    //       { key: "userName" },
    //       { key: "Occupation" },
    //       { key: "Departement" },
    //       { key: "Tel" },
    //     ],
    //   },
    //   {
    //     key: "healthStates",
    //     props: [{ key: "title" }],
    //   },
    // ];

    const fileName = `${name}_${Date.now()}_${uuidv4()}`;

    jsonToExcel(
      obj,
      props,
      `./public/${fileName}.xlsx`
    );

    res.status(200).send({
      "url": `${appUrl}:${port}/${fileName}.xlsx`,
      "name": `${fileName}.xlsx`,
    });
  }

});

app.listen(port, () => {
  console.log(`Example app listening at ${appUrl}:${port}`)
})
