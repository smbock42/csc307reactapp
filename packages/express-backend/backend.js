// backend.js
import cors from "cors";
import express from "express";



const app = express();
const port = 8000;

const users = { 
    users_list : [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }
 const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}

const findUserById = (id) =>
    users['users_list'].find( (user) => user['id'] === id);

 
const addUser = (user) => {
    const id = generateId();
    user.id = id;
    users['users_list'].push(user);
    return user;
}
       
const findUserByJobAndName = (name,job) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name && user['job'] === job); 
}

function generateId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';

    for (let i = 0; i < 8; i ++)
    {
        randomId += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return randomId
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job
    if (job != undefined && name != undefined){
        let result = findUserByJobAndName(name,job);
        result = {users_list: result};
        res.send(result);
    }
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('User not found.');
    } else {
        let index = users['users_list'].indexOf(result);
        users['users_list'].splice(index, 1);
        res.status(204).send();
    }
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  