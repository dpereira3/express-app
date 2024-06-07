const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const users = require('../users')

// GET ALL USERS
router.get('/', (req, res) => {
    res.json(users);
})

// GET SINGLE USER
router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const isFound = users.some( user => user.id === userId );

    if(isFound){
        res.json(users.filter( user => user.id === userId )); 
    } else {
        res.status(400).json({ msg: `no user with the id of ${req.params.id}`})
    }
})

// CREATE USER
router.post('/', (req, res) => {
    //res.send(req.body);
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    };
    if(!newUser.name || !newUser.email) {
        return res.status(400).json({ msg: `please include a name and email`});
    }
    users.push(newUser);
    res.json(users);
})

// UPDATE USER
router.put('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));
    if(found){
        const updatedUser = req.body;
        users.forEach( user => {
            if(user.id === parseInt(req.params.id)){
            user.name = updatedUser.name ? updatedUser.name : user.name;
            user.email = updatedUser.email ? updatedUser.email : user.emal;
            res.json({ msg: 'User Updated', user })
            }
        })
        
    } else {
        res.status(400).json({ msg: `No user with id of ${req.params.id} was found`})
    }
})

// DELETE USER
router.delete('/:id', (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));
    if(found) {
            res.json({ msg: 'User deleted',
            users: users.filter(user => user.id !== parseInt(req.params.id))
        })
    } else {
        res.status(400).json({msg: `No user with id of ${req.params.id} was found`})
    }
})


module.exports = router;