const express = require('express');
const bodyParse = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParse.json());

//all what this service do is watching to events from the event bus

//the request holds the event object which has 2 items: type, data
app.post('/events', async (req, res)=>{
    const {type, data} = req.body;
    if(type === 'CommentCreated'){
        const status = data.content.includes('orange') 
                        ? 'rejected' 
                        : 'approved';
     await axios.post('http://localhost:4005/events', {
         type: 'CommentModerated',
         data: {
             id: data.id,
             postId: data.postId,
             status,
             content: data.content
         }
     });                 
    }
    res.send({});
});

app.listen(4003, ()=>{
    console.log('Am listening on port 4003')
});