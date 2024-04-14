import express from "express";
import task from "../models/task.js";

const router = new express.Router();
const myTask = task.Task;


router.get("/tasks", async (req, res) =>
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

router.get("/tasks/:id", async (req, res) =>
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

router.post("/tasks", async (req, res) =>
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

router.patch("/tasks/:id", async (req, res) =>
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

router.delete("/tasks/:id", async (req, res) =>
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

export default
{
    router : router
}