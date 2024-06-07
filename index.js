const express = require('express');
const app = express();
const path = require('path');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// is auth
const isAuth = true;

// Midleware func
const logger = (req, res, next) => {
    if(isAuth){
        console.log('auth')
        next();
    } else {
        return res.status(400).json({msg: 'not authenticated'});
    }
}

// init Midleware
app.use(logger)

const PORT = process.env.PORT || 5000;

const users = require('./users')

//app.get('/', (req, res) =>{
    //res.send('<h1>Hello world</h1>')
    //res.sendFile(path.join(__dirname, 'public', 'index.html'))
//})

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', require('./routes/user'));

app.listen(PORT, () => console.log(`server run on port ${PORT}`));
