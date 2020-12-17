let express = require('express')
let bodyParser = require('body-parser')
let MongoClient = require('mongodb').MongoClient
let ObjectId = require('mongodb').ObjectID

let app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    next();
})

let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.send('API WELCOME');
})

app.get('/developers', (req, res) => {
    db.collection('developers').find().toArray((err, docs) => {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }
        res.send(docs)
    })
})

app.get('/developer/:id', (req, res) => {
    db.collection('developers').findOne({_id: ObjectId(req.params.id)}, (err, doc) => {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }
        res.send(doc)
    })
})

//Adding new developers
app.post('/developers', (req, res) => {

    let developer = {
        name: req.body.name,
        skill: req.body.skill
    };

    db.collection('developers').insert(developer, (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500)
        }
        res.send(developer);
    })
})

app.put('/developers/:id', (req, res) => {
    db.collection('developers').updateOne(
        { _id:  ObjectId(req.params.id) },
        {$set: { name: req.body.name, skill: req.body.skill } },
        null,
        (err) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    )
})

app.delete('/developers/:id', (req, res) => {
   db.collection('developers').deleteOne(
       { _id:  ObjectId(req.params.id) },
       null,
       (err) => {
           if (err) {
               console.log(err);
               res.sendStatus(500)
           }
           res.sendStatus(200);
       }
   )
})


MongoClient.connect('mongodb://localhost:27017/developersApi',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        return console.log(err)
    }
    db = client.db('developersApi');
    app.listen(3012, () => {
        console.log('API app started')
    });
})
