const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { stat } = require('fs');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
 
//quick example
// posts === {
//     'j123j42' : {
//         id: 'j123j42',
//         title: 'Post for Testing',
//         comments: [
//             {id:'kl2lk', content: 'This is mt comment number 1'},
//             {id:'kl3lk', content: 'This is a comment number 2'}
//         ]    
//     }

// };

app.get('/posts', (req, res)=>{
    res.send(posts);
});

const handleEvent = (type, data)=>{
    if (type === "PostCreated"){
        const {id, title} = data;
        posts[id] = {id, title, comments: []};
    } 
    if(type === "CommentCreated"){
        const {id, content, postId, status} = data;

        const post = posts[postId];
        post.comments.push({id, content, status});
    }

    if(type === 'CommentUpdated'){
        const {id, content, postId, status} = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => {
            return comment.id === id;
        });

        comment.status = status;
        comment.content = content;
    }
}
app.post('/events', (req, res)=>{
    const {type, data} = req.body;
    handleEvent(type, data);
    console.log("posts" , posts);
    // we recieved the event and we processed it
    res.send({});
});


app.listen(4002, async ()=>{
    console.log('Listning to port 4002');

    //its time to see if we missed some of the events when we restart from a crash
    const res = await axios.get('http://localhost:4005/events');
    console.log(res.data);
    for (let event of res.data){
        handleEvent(event.type, event.data);  
    }
}) 