const express = require('express');
require('dotenv').config();
const app = express();
const port = 3000;

// mongoDB database
const { MongoClient, ServerApiVersion} = require("mongodb");

// Replace the uri string with your connection string.
const uri = process.env.DB_URI;

// dsdwdwd
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



const collection = client.db(process.env.DB_COLLECTION).collection(process.env.DB_NAME);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.set('view engine', 'ejs');
app.use(express.static('static'));


// Routes 


app.get('/', (req, res) => {
  res.render('home');
})

app.get('/index', async (req, res) => {
  const users = await collection.find().toArray()
  res.render('index', {users});
})


// Gebruiker aanmaken in database eerste versie // 



app.post('/', async (req, res) => {
  console.log(req.body);

  const user = {
    username: req.body.username,
    password: req.body.password
  }

  await collection.insertOne(user);


  res.redirect('/index');
});

app.post('/index', async (req, res) => {
  console.log(req.body);

  const user = {
    username: req.body.username,
    password: req.body.password
  }

  await collection.insertOne(user);

  
  

  res.redirect('/index');
});



// async function run() {
//   try {
//     const database = client.db('login');
//     const customers = database.collection('users');
//     // Query for a movie that has the title 'Back to the Future'
//     const query = {username:"Syb"};
//     const movie = await customers.findOne(query);
//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error

//   }
// }
// run().catch(console.dir);





app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});  




