import express from "express";
import User from "./models/user.js";
import Task from "./models/task.js";
import("./db/mongoose.js");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/users", (req, res) =>
{
    User.User.find({})
    .then((result) =>
    {
        res.status(200).send(result);
    })
    .catch((error) =>
    {
        res.status(500).send(error);
    });
});

app.get("/users/:id", (req, res) =>
{
    const _id = req.params.id;
    
    User.User.findById(_id)
    .then((result) =>
    {
        if (!result)
        {
            return res.status(404).send();
        }
        
        res.status(200).send(result);
    })
    .catch((error) =>
    {
        res.status(500).send(error);
    });
});

app.post("/users", (req, res) =>
{
    const user = new User.User(req.body);
    
    user.save()
    .then((result) =>
    {
        res.status(201).send(result);
    })
    .catch((error) =>
    {
        res.status(400).send(error);
    });
});

app.post("/tasks", (req, res) =>
{
    const task = new Task.Task(req.body);
    
    task.save()
    .then((result) =>
    {
        res.status(201).send(result);
    })
    .catch((error) =>
    {
        res.status(400).send(error);
    });
});

app.get("/tasks", (req, res) =>
{
    Task.Task.find({})
    .then((result) =>
    {
        res.status(201).send(result);
    })
    .catch((error) =>
    {
        res.status(500).send(error);
    });
});

app.get("/tasks/:id", (req, res) =>
{
    const _id = req.params.id;
    
    Task.Task.findById(_id)
    .then((result) =>
    {
        if (!result)
        {
            return res.status(404).send();
        }
        
        res.status(201).send(result);
    })
    .catch((error) =>
    {
        res.status(500).send(error);
    });
});

app.listen(port, () =>
{
    console.log("Server is up on port : " + port);
});