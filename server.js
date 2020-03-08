const express = require('express');
const cookieParser = require('cookie-parser');


const app = express();
const port = 3000;

app.use((req, res, next) => {
    console.log(`receiving requests for ${req.url}`);
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// app.get('/login', (req, res) => res.sendFile('views/login.html', { root: __dirname }));

app.post('/madlibs', (req, res) => res.redirect('madlibs'));
app.get('/madlibs', (req, res) => res.sendFile('madlibs.html', { root: __dirname }));

app.post('/assignment3', (req, res) => res.redirect('assignment3'));
app.get('/assignment3', (req, res) => res.sendFile('assignment3.html', { root: __dirname }));

app.post('/tic-tac-toe', (req, res) => res.redirect('tic-tac-toe'));
app.get('/tic-tac-toe', (req, res) => res.sendFile('tic-tac-toe.html', { root: __dirname }));

// app.get('/results', (req, res) => res.sendFile('views/results.html', { root: __dirname }));

// app.get('*', (req, res) => res.sendFile('views/error.html', { root: __dirname }));
// app.get('*', (req, res) => res.sendStatus(404));

app.listen(port, () => console.log(`Assignment3 server listening on http://localhost:${port}`));