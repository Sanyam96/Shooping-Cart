const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
   res.send('please go to /api/products')
});


const port = 8888;
app.listen(port, function () {
    console.log("Server started on http://localhost: " + port + "");
});

