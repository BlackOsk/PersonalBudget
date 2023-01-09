const express = require('express');
const { get } = require('http');
const app = express();

let envelopes = [];

let totalBudget = 0;



app.get('',(req, res, next) => {
    res.send('Hellow World!');
})

app.post('/envelops', (req, res, next) => {
    const recevedEnvelops = req.query;
    if(recevedEnvelops) {
        envelopes.push(recevedEnvelops);
        res.status(201).send(envelopes);
    }else {
        res.status(400).send;
    }
})

app.get('/envelops/:envname',(req, res, next) => {
    const envelopContent = envelopes[0][req.params.envname];
    if(envelopContent){
        res.send(`${req.params.envname}: ${envelopContent}`);
    }else {
        res.status(404).send('Envelop not found.');
    }
})

app.get('/envelops',(req, res, next)=> {
    res.send(envelopes);
})

app.post('/envelops/totalbudget', (req, res, next) => {
    const recevedBudget = req.query;
    if(recevedBudget){
        totalBudget = recevedBudget['totalbudget'];
        res.status(201).send(totalBudget);
    }else {
        res.status(400).send;
    }
})

app.get('/envelops/totalbudget',(req, res, next)=> {
    res.send(totalBudget);
})

const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`Listening on Port ${PORT}`);
})