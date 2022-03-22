const fs = require("fs");
const path = require("path");
const express = require("express");
const xml = require("xml");

const app = express();

const PORT = process.env.PORT || 8081;

const elements = require('./data.js');


// CORS POLICY

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, Content-Type, Accept');
    res.type('application/json');
    next();
});

function getElementById(id) {
    const elementFiltering = [];
    elements.forEach(element => {
        if(element["$"].id_group === id) {
            elementFiltering.push(element["$"]);
        }
    });

    // convert to xml
    return elementFiltering;
};


// FIXME: Update element randomly

app.get("/element_status/:id", (req,res) => {
    const { id } = req.params;


    // FIXME: DO SOMETHING HERE
    // fs.readFile(path.resolve(__dirname, "data.xml"), (error, result) => {
    //     console.log(result);
    //     if(!error) {
    //         // res.status(200).json({
    //         //     elements: getElementById(id)
    //         // })
    //         // res.send(xml(getElementById(id)));
    //         res.status(200).send(xml(result));
    //     };

    // });

    res.status(200).json({
        elements: getElementById(id),
    })
    

    
});


app.listen(PORT, () => {
    console.log(`Server is Listening on PORT: ${PORT}`);
});