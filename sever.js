const express = require('express');
const { get } = require('http');
const app = express();

let envelopes = [
    {
        Gas: 100,
        Clothing:200,
        DiningOut: 300,
    }
];

let totalBudget = 600;



app.get('',(req, res, next) => {
    res.send('Hellow World!');
})

app.post('/totalbudget', (req, res, next) => {
    const recevedBudget = req.query;
    if(recevedBudget){
        totalBudget = Number(recevedBudget['totalbudget']);
        res.send(totalBudget.toString());
    }else {
        res.status(400).send;
    }
})

app.post('/envelops', (req, res, next) => {
    const recevedEnvelops = req.query;
    if(recevedEnvelops) {
        envelopes.push(recevedEnvelops);
        res.status(201).send(envelopes[0]);
    }else {
        res.status(400).send;
    }
})


app.get('/envelops/:envname',(req, res, next) => {
    const envelopContent = envelopes[0][req.params.envname];
    if(envelopContent){
        res.send(envelopContent);
    }else {
        res.status(404).send('Envelop not found.');
    }
})

app.put('/envelops/cost',(req, res, next) => {
    const costEnvelop = req.query.costEnvelop;
    const costMoney = Number(req.query.costMoney);
    if(envelopes[0][costEnvelop]- costMoney >= 0){
        envelopes[0][costEnvelop] -= costMoney;
        totalBudget -= costMoney;
        res.send(envelopes[0][costEnvelop].toString());
    } else {
        envelopes[0][costEnvelop] = 0;
        res.send('You have spend all the money in the envelop!')
    }
    
})

app.delete('/envelops/:envname', (req, res, next) => {
    const toDelete = req.params.envname;
    if(envelopes[0][toDelete]){
        const deleteBudget = envelopes[0][toDelete];
        totalBudget -= deleteBudget;
        delete envelopes[0][toDelete];
        res.send(envelopes[0]);
    } else {
        res.status(404).send('Envelop not found!');
    }    
})

app.get('/envelops',(req, res, next)=> {
    res.send(envelopes[0]);
})

app.get('/totalbudget',(req, res, next)=> {
    res.send(totalBudget.toString());
})

const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`Listening on Port ${PORT}`);
})