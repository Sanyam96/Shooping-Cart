const express = require('express');

const app = express();

app.get('/', (req, res) => {
   res.send('Hello World')
});

var port = 8888;

app.listen(port, function () {
    console.log("Server started on http://localhost:8888");
});