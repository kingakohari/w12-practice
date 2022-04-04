
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port= 9000;

app.get("/", (req, res, next) => {                  // next = legyen-e további művelet végrehajtva, ha végzett?
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
}) 

app.get("/kiscica", (req, res, next) => {                 
    res.sendFile(path.join(`${__dirname}/../frontend/somefile.json`));
}) 

app.get("/something", (req, res, next) => {
    console.log("Request received for something endpoint.");
    res.send(`Thank you for your request. This is our response for "something" endpoint.`)
}) 

app.get("/api/v1/users", (req, res, next) => {
    console.log("Request received for users endpoint.");
    res.sendFile(path.join(`${__dirname}/../frontend/users.json`));

    /* const users = [...]  // tartalma átemelve a users.json-be 
    
    res.send(JSON.stringify(users)) */
})

app.get("/api/v1/users/active", (req, res, next) => {
    console.log("Request received for active users endpoint.");
    fs.readFile("../frontend/users.json", (error, data) => {
        if (error) {
            res.send("Error occurred")
        } else  {
            const users = JSON.parse(data)
            const activeUsers = users.filter(user => user.status === "active");
            res.send(activeUsers)
        }
    })
})

app.get("/api/v1/users/passive", (req, res, next) => {
    console.log("Request received for passive users endpoint.");
    fs.readFile("../frontend/users.json", (error, data) => {
        if (error) {
            res.send("Error occurred")
        } else  {
            const users = JSON.parse(data)
            res.send(users.filter(user => user.status === "passive"));
        }
    })
})

app.use('/pub', express.static(`${__dirname}/../frontend/public`));

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
})
