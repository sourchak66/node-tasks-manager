import express from "express";
import user from "./models/user.js";
import task from "./models/task.js";
import("./db/mongoose.js");

const app = express();

const port = process.env.PORT || 3000;

const myUser = user.User;
const myTask = task.Task;

app.use(express.json());

app.get("/users", async (req, res) =>
{
    try
    {
        const users = await myUser.find({});
        res.status(200).send(users);
    }
    catch (error)
    {
        res.status(500).send(error);
    }
});

app.get("/users/:id", async (req, res) =>
{
    const _id = req.params.id;
    
    try
    {
        const user = await myUser.findById(_id);
        
        if (!user)
        {
            return res.status(404).send();
        }
        
        res.status(200).send(user);
    }
    catch (error)
    {
        res.status(500).send(error);
    }
});

app.post("/users", async (req, res) =>
{
    const newUser = new myUser(req.body);

    try
    {
        await newUser.save();
        
        res.status(201).send(newUser);
    }
    catch (error)
    {
        res.status(400).send(error);
    }
});

app.post("/tasks", async (req, res) =>
{
    const newTask = new myTask(req.body);
    
    try
    {
        await newTask.save();
        
        res.status(201).send(newTask);
    }
    catch (error)
    {
        res.status(400).send(error);
    }
});

app.get("/tasks", async (req, res) =>
{
    try
    {
        const tasks = await myTask.find({});
        
        res.status(201).send(tasks);
    }
    catch (error)
    {
        res.status(400).send(error);
    }
});

app.get("/tasks/:id", async (req, res) =>
{
    const _id = req.params.id;
    
    try
    {
        const task = await myTask.findById(_id);
        
        if (!task)
        {
            return res.status(404).send();
        }
        
        res.status(200).send(task);
    }
    catch (error)
    {
        res.status(500).send(error);
    }
});

app.patch("/users/:id", async (req, res) =>
{
    const _id = req.params.id;
    
    const updateInfo = req.body;
    
    const allowedUpdates = [ "name", "email", "password", "age" ];
    
    const updates = Object.keys(updateInfo);
    
    const isValidOperation = updates.every((update) =>
    {
        return allowedUpdates.includes(update);
    });
    
    if (!isValidOperation)
    {
        return res.status(400).send({ error : "Invalid Updates!!" });
    }
    
    try
    {
        const newUser = await myUser.findByIdAndUpdate(_id, updateInfo, { new : true, runValidators : true });
                
        if (!newUser)
        {
            return res.status(404).send();
        }
        
        res.status(200).send(newUser);
    }
    catch (error)
    {
        res.status(400).send(error);
    }
});

app.patch("/tasks/:id", async (req, res) =>
{
    const _id = req.params.id;
    
    const updateinfo = req.body;
    
    const allowedUpdates = [ "description", "completed" ];
    
    const updates = Object.keys(updateinfo);
    
    const isValidOperation = updates.every((update) =>
    {
        return allowedUpdates.includes(update);
    });
    
    if (!isValidOperation)
    {
        return res.status(400).send({ error : "Invalid Updates!!" });
    }
    
    try
    {
        const newTask = await myTask.findByIdAndUpdate(_id, updateinfo, { new : true, runValidators : true });
        
        if (!newTask)
        {
            return res.status(404).send();
        }

        res.status(200).send(newTask);
    }
    catch (error)
    {
        res.status(400).send(error);
    }
});

app.delete("/users/:id", async (req, res) =>
{
    const _id = req.params.id;
    
    try
    {
        const user = await myUser.findByIdAndDelete(_id);
        
        if (!user)
        {
            return res.status(404).send();
        }
        
        res.status(200).send(user);
    }
    catch (error)
    {
        res.status(500).send(error);
    }
});

app.delete("/tasks/:id", async (req, res) =>
{
    const _id = req.params.id;
    
    try
    {
        const task = await myTask.findByIdAndDelete(_id);
        
        if (!task)
        {
            return res.status(404).send();
        }
        
        res.status(200).send(task);
    }
    catch (error)
    {
        res.status(500).send(error);
    }
});

app.listen(port, () =>
{
    console.log("Server is up on port : " + port);
});