
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(express.json());

const port = 9000;

const fFolder = `${__dirname}/../frontend`

app.get("/", (req, res, next) => {                
    res.sendFile(path.join(`${fFolder}/index.html`));
}) 

app.get("/api/v1/users", (req, res) => {
    console.log("Request received for users endpoint.");
    res.sendFile(path.join(`${fFolder}/users.json`));
})


app.post("/users/new", (req, res) => {
    fs.readFile("../frontend/users.json", (error, data) => {
        if (error) {
            console.log(error);
            res.send("Error reading users file")
        } else {
            const users = JSON.parse(data)
            console.log(req.body);
            users.push(req.body)
            
            fs.writeFile("../frontend/users.json", JSON.stringify(users), error => {
                if (error) {
                    console.log(error);
                    res.send("Error writing users file")
                }
            })
            res.send(req.body)
        }
    })
})



app.use('/pub', express.static(`${fFolder}/public`));

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
})
