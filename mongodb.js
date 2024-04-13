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
        // ]
        // ).then((result) =>
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