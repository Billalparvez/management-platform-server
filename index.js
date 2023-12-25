const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())
// platform
// h2vYxW47wUkrK9y5

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ktupw59.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)

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
        // await client.connect();
        const creatJobCollection = client.db('platformDB').collection('creatJob')

        app.post('/creatJob', async (req, res) => {
            const job = req.body;
            console.log(job)
            const result = await creatJobCollection.insertOne(job)
            res.send(result)

        })
        app.get('/creatJob', async (req, res) => {
            const result = await creatJobCollection.find().toArray()
            res.send(result)
        })

        app.put('/creatJob/:id', async (req, res) => {
            const id = req.params.id
            const updateData = req.body
            console.log(updateData)
            const filter = { _id: new ObjectId(id) }
            // const options = { upsert: true }
            const updateCategory = {
                $set: {
                    title: updateData.title,
                    dateLine: updateData.dateLine,
                    description: updateData.description,
                    priority: updateData.priority,
                    
                }
            }
            const result = await categoryCollection.updateOne(filter, updateCategory)
            res.send(result)
        })

        // app.patch('/api/users/admin/:id', async (req, res) => {
        //     const id = req.params.id;
        //     console.log(id)
        //     const filter = { _id: new ObjectId(id) };
        //     const updatedDoc = {
        //         $set: {
        //             role: 'admin'
        //         }
        //     }
        //     const result = await usersCollection.updateOne(filter, updatedDoc);
        //     res.send(result);
        // })
        app.delete('/creatJob/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await creatJobCollection.deleteOne(query);
            res.send(result);
        })
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})