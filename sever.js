const express = require('express');
const { get } = require('http');
const app = express();

let envelopes = [];

let totalBudget = 0;



app.get('',(req, res, next) => {
    res.send('Hellow World!');
})

app.post('/totalbudget/:number', (req, res, next) => {
    const recevedBudget = Number(req.params.number);
    if(recevedBudget){
        totalBudget = recevedBudget;
        res.send(totalBudget.toString());
    }else {
        res.status(400).send();
    }
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
        res.send(envelopContent);
    }else {
        res.status(404).send('Envelop not found.');
    }
})

app.put('/envelops/cost/:costEnvelop/:costMoney',(req, res, next) => {
    const costEnvelop = req.params.costEnvelop;
    const costMoney = Number(req.params.costMoney);
    if(envelopes[0][costEnvelop]- costMoney >= 0){
        envelopes[0][costEnvelop] -= costMoney;
        totalBudget -= costMoney;
        res.send(envelopes[0][costEnvelop].toString());
    } else {
        envelopes[0][costEnvelop] = 0;
        totalBudget -= costMoney;
        res.send('You have spend all the money in the envelop and spend extra Money!')
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

app.post('/envelops/transfer/:from/:to/:number', (req, res, next) => {
    const transFrom = req.params.from;
    const transTo = req.params.to;
    const transNumber = Number(req.params.number);
    if(envelopes[0][transFrom] >= transNumber){
        envelopes[0][transFrom] -= transNumber;
        envelopes[0][transTo] += transNumber;
        res.send(envelopes[0]);
    }else {
        res.send(`You don't have ENOUGH money in ${transFrom}!`);
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