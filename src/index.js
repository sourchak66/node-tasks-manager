import express from "express";
import userRouter from "./routers/user.js";
import taskRouter from "./routers/task.js";
import bcrypt from "bcryptjs";
import("./db/mongoose.js");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter.router);
app.use(taskRouter.router);

app.listen(port, () =>
{
    console.log("Server is up on port : " + port);
});

// const myFunction = async () =>
// {
//     const password = "Red12345!";
//     const hashedPassword = await bcrypt.hash(password, 8);
//     const isMatch = await bcrypt.compare("Red12345!", hashedPassword);
    
//     console.log(password);
//     console.log(hashedPassword);
//     console.log(isMatch);
// }

// myFunction();