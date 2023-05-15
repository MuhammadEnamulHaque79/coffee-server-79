const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


//Middleware;
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2ign9na.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
    // const database = client.db("insertDB");
    // const haiku = database.collection("haiku");
    const coffeeCollection = client.db('coffeeDB').collection('coffee');


    //FIND data from database;

    app.get('/addCoffee',async(req,res)=>{
        const cursor = coffeeCollection .find();
        const result = await cursor.toArray();
        res.send(result);

       
})

//RECEIVE DATA FROM CLIENT SIDE;
    app.post('/addCoffee',async(req,res)=>{
    const newCoffee = req.body;
    // console.log(newCoffee);
    const result = await coffeeCollection.insertOne(newCoffee);
    res.send(result);


})
//DELETE data from database;

app.delete('/addCoffee/:id',async(req,res)=>{
  const id = req.params.id;
  const query = { _id:new ObjectId(id) };
  const result = await coffeeCollection.deleteOne(query);
  res.send(result);
  // if(data.deletedCount > 0){
  //   console.log("Successfully deleted one document.");
  // }
})



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//

app.get('/',(req,res)=>{
    res.send('Yes, I can. Hey man,do hard work');
});

app.listen(port,()=>{
    console.log(` Yes, my coffee server is running on port : ${port}`);
});

