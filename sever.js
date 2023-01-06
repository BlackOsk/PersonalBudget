const express = require('express');
const { get } = require('http');
const app = express();

app.get('',(req, res, next) => {
    res.send('Hellow World!');
})

const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`Listening on Port ${PORT}`);
})