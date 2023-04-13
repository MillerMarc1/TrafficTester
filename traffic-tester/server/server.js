const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./orcldb');
const app = express();

app.use(cors());
app.use(bodyParser.json())

app.get('/get', (req, res) => {
    const query = "SELECT * FROM TESTTABLE";
    
    connection.req(query).then((response) => {
        res.send(response[0]);
        //console.log(response[0]);
    })
})

app.listen(4000, () => {
    console.log('running on port 4000')
});
