// import mongodb from "mongodb";
import { MongoClient, ObjectId } from "mongodb";

// const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;

const connectionURL = "mongodb://127.0.0.1:27017/";
const databaseName = "task-manager";

const client = new MongoClient(connectionURL);

// const id = new ObjectId();

// console.log(id);
// console.log(id.id);
// console.log(id.id.length);
// console.log(id.getTimestamp());
// console.log(id.toHexString());
// console.log(id.toHexString().length);

client.connect()
    .then(() =>
    {
        console.log("Connected Successfully!!");
        
        const db = client.db(databaseName);
        
        const usersCollection = db.collection("users");
        const tasksCollection = db.collection("tasks");
        
        tasksCollection.findOne({ _id : new ObjectId("661a76537e4ce2a2d309efab") })
        .then((document) =>
        {
            console.log(document);
        })
        .catch((error) =>
        {
            console.log("Unable to fetch!!");
        });
        
        tasksCollection.find({ completed : false }).toArray()
        .then((documents) =>
        {
            console.log(documents);
        })
        .catch((error) =>
        {
            console.log("Unable to fetch!!");
        });
        
        // usersCollection.findOne({ _id : new ObjectId("661a7951978b9025ea8763b9") })
        // .then((document) =>
        // {
        //     console.log(document);
        // })
        // .catch((error) =>
        // {
        //     console.log("Unable to fetch!!");
        // });
        
        // usersCollection.find({ age : 32 }).toArray()
        // .then((documents) =>
        // {
        //     console.log(documents);
        // })
        // .catch((error) =>
        // {
        //     console.log("Unable to fetch!!");
        // });
        
        // usersCollection.find({ age : 32 }).count()
        // .then((count) =>
        // {
        //     console.log(count);
        // })
        // .catch((error) =>
        // {
        //     console.log("Unable to fetch!!");
        // });
        
        // usersCollection.insertOne(
        //     {
        //         _id : id,
        //         name : "Vikram",
        //         age : 32
        //     }
        // ).then((result) =>
        // {
        //     console.log(result);
        // })
        // .catch((error) =>
        // {
        //     console.log("Unable to insert to users!!");
        // });
        
        
        // usersCollection.insertMany(
        // [
        //     {
        //         name : "Chandana",
        //         age : 61
        //     },
        //     {
        //         name : "Mihir",
        //         age : 62
        //     }
        // ])
        // .then((result) =>
        // {
        //     console.log(result);
        // })
        // .catch((error) =>
        // {
        //     console.log("Unable to insert to users!!");
        // });
        
        // tasksCollection.insertMany(
        // [
        //     {
        //         description : "Clean the house",
        //         completed : true
        //     },
        //     {
        //         description : "Renew Inspections",
        //         completed : false
        //     },
        //     {
        //         description : "Pot plants",
        //         completed : false
        //     }
        // ]
        // ).then((result) =>
        // {
        //     console.log(result);
        // })
        // .catch((error) =>
        // {
        //     console.log("Unable to insert to tasks!!");
        // });
    })
    .catch((error) =>
    {
        console.log("Unable to connect to database!!");
    })
    .finally(() =>
    {
        // client.close();
    });