import express from "express";
import userRouter from "./routers/user.js";
import taskRouter from "./routers/task.js";
import("./db/mongoose.js");


const port = process.env.PORT || 3000;

const app = express();


app.use(express.json());
app.use(userRouter.router);
app.use(taskRouter.router);


app.listen(port, () =>
{
    console.log("Server is up on port : " + port);
});