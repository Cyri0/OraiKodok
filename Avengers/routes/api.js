var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

let avengersJsonPath = path.join(__dirname, '../assets/messages.json');
var messages = [];

initializeMessages(avengersJsonPath);

function initializeMessages(path) {
    try {
        messages = require(path);
    } catch (e) {
        console.log("File not found, or incorrect.")
    }
}

router.post('/uzenet', function (req, res, next) {
    console.log("API call POST(api/uzenet): ", req.body);

    if(req.body.kuldo != null && req.body.uzenet != null)
        {
        messages.push({
            "kep":"profile.jpg",
            "kuldo": req.body.kuldo,
            "uzenet": req.body.uzenet,
        });

        fs.writeFileSync(avengersJsonPath, JSON.stringify(messages));        
        res.send(JSON.stringify(JSON.stringify(messages)));
        }
        else{
            res.send(JSON.stringify({"message":"ERROR"}));
        }
});

router.get('/uzenet', function (req, res, next) {
    console.log("API call GET(api/uzenet)");
    if (messages.length === 0) {
        res.send(JSON.stringify(
            []
        ));
    } else {
        res.send(JSON.stringify(messages));
    }
});

router.delete('/uzenet', function (req, res, next) {
    console.log("API call DELETE(api/uzenet)");
    try{
        messages = [];
        fs.unlinkSync(avengersJsonPath, JSON.stringify(messages));
        res.send(JSON.stringify({'message':'DELETE Success'}));
    } catch (e) {
        res.send(JSON.stringify({'message':'File not found. DELETE failed.'}));
    }
});

module.exports = router;
