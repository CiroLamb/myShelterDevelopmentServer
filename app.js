const fs = require("fs");
const path = require("path");
const express = require("express");
const xml = require("xml");
var ReverseMd5 = require("reverse-md5");
const PASSWORD = "12345";

// Md5
const md5 = require("./md5.js");
const app = express();

const PORT = process.env.PORT || 8081;

const elements = require("./data.js");

var rev = ReverseMd5({
  lettersUpper: false,
  lettersLower: true,
  numbers: true,
  special: false,
  whitespace: false,
  maxLen: 12,
});

const newElements = elements.map((element) => element["$"]);
console.log(newElements);
// CORS POLICY

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, X-Requested-With, Content-Type, Accept"
  );
  res.type("application/json");
  next();
});

function getElementById(id) {
  const elementFiltering = [];
  newElements.forEach((element) => {
    if (element.id_group === id) {
      elementFiltering.push(element);
    }
  });

  // convert to xml
  return elementFiltering;
}
function generate_random_string(string_length) {
  let random_string = "";
  let random_ascii;
  for (let i = 0; i < string_length; i++) {
    random_ascii = Math.floor(Math.random() * 25 + 97);
    random_string += String.fromCharCode(random_ascii);
  }
  return random_string;
}

let generateToken = "";
// FIXME: Update element randomly

app.get("/element_status/:id/:token", (req, res) => {
  const { id, token: EncryptedToken } = req.params;

  // console.log(token);
  // TODO: reverse the md5
  // TODO: get the password
  // TODO: look for the password to be correct
  // console.log(EncryptedToken);
  // console.log(md5(token + PASSWORD));
  // FIXME: DO SOMETHING HERE

  if (md5(generateToken + PASSWORD) === EncryptedToken) {
    res.status(200).json({
      elements: getElementById(id),
    });
  } else {
    res.status(401).json({
      message: "Non Autorizzato.",
    });
  }
});

app.get("/element_status/:token", (req, res) => {
  const { token: EncryptedToken } = req.params;

  if (md5(generateToken + PASSWORD) === EncryptedToken) {
    res.status(200).json({
      elements: newElements,
    });
  } else {
    console.log("NOT AUTHORIZED");
    res.status(401).json({
      message: "Non Autorizzato.",
    });
  }
});

app.get("/token", (req, res) => {
  generateToken = generate_random_string(20);
  res.status(200).json({ token: generateToken });
});

app.listen(PORT, () => {
  console.log(`Server is Listening on PORT: ${PORT}`);
});
