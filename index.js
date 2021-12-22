const bodyParser = require('body-parser');
const express = require('express');
const app = express();
// var exphbs = require('express-handlebars');
const { engine } = require('express-handlebars');

const messagebird = require('messagebird')('aoKCy9a6mQlOn1w9B4peyu9OLTpH4qmC');

app.engine('handlebars', engine({ defaultLayout: 'main' }));
// app.set('view-engine', 'handle-bars');
app.use(bodyParser.urlencoded({ extended: true }));

// app.engine('handlebars', engine({defaultLayout: "main"}));
app.set('view engine', 'handlebars');
app.set("views", "./views/layouts/");



app.get('/', (req, res) => {
    res.render('step1');
});

app.post('step2', (req, res) => {
    var number = req.body.number;

    messagebird.verify.create(number, {
        template: "Your verification code is %token."
    }), function (err, response) {
        if (err) {
            //request failed
            console.log(err);
            res.render('step1', {
                error: err.errors[0].description
            });
        }
        else {
            console.log(response);
            res.render('step2', {
                id: response.id
            })
        }
    }
});

app.get('/', (req, res) => {
    var id = req.body.id;
    var token = req.body.token;

    messagebird.verify.verify(id, token, function (err, response) {
        if (err) {
            console.log(err);
            res.render('step1', {
                error: err.errors[0].description
            })

        }
        else{
            res.render('step3');
        }
    })
    res.render()
});

app.listen(3000)