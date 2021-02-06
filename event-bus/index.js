const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
const events = [];
//implement end point to isten to the incoming events.
app.post('/events', (req, res)=>{
    const event = req.body;
    events.push(event);
    //make series of post request to publish the event to other services
    axios.post('http://localhost:4000/events', event).catch((err)=>{console.log(err);});
    axios.post('http://localhost:4001/events', event).catch((err)=>{console.log(err);});
    axios.post('http://localhost:4002/events', event).catch((err)=>{console.log(err);});
    axios.post('http://localhost:4003/events', event).catch((err)=>{console.log(err);});

    res.send({status:'ok'}); 
})

app.get('/events', (req, res)=>{
    res.send(events);
});
app.listen(4005, ()=>{
    console.log('Am Listening on 4005');
}); 