const app = require('express')();
const data = require('./data');
const port = process.env.PORT || 8000;

const routeWrapper = (handler) => {
    return (req, res) => {
        try {
            handler(req.query)
                .then(result => {
                    res.status(200).send(result);
                })
                .catch(err => {
                    res.status(500).send({'ERROR': 'ERROR', 'details': err});
                });
        }
        catch(err) {
            res.status(500).send({'ERROR': 'ERROR', 'details': err});
        }
    };
}

app.get('/', (req, res) => {
    res.status(200).send('Hello from Heroku!');
});

app.get('/dbTest', routeWrapper(data.healthCheck));
app.get('/getPeople', routeWrapper(data.getPeople));

app.get('/getPeople', routeWrapper(data.getPeople));

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});