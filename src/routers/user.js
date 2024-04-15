import express from "express";
import user from "../models/user.js";

const router = new express.Router();
const myUser = user.User;


router.get("/users", async (req, res) =>
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

router.get("/users/:id", async (req, res) =>
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

router.post("/users/login", async (req, res) =>
{
    const email = req.body.email;
    const password = req.body.password;
    
    try
    {
        const user = await myUser.findByCredentials(email, password);
        
        res.status(200).send(user);
    }
    catch (error)
    {
        res.status(400).send(error);
    }
});

router.post("/users", async (req, res) =>
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

router.patch("/users/:id", async (req, res) =>
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
        const newUser = await myUser.findById(_id);
        
        updates.forEach((update) =>
        {
            newUser[update] = updateInfo[update];
        });
        
        await newUser.save();
        
        // const newUser = await myUser.findByIdAndUpdate(_id, updateInfo, { new : true, runValidators : true });
                
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

router.delete("/users/:id", async (req, res) =>
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

export default
{
    router : router
}